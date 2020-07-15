from firebase_admin import auth, credentials, firestore
import firebase_admin
from operator import itemgetter

class Firebase:
    def __init__(self):
        # Need an env var set per: https://firebase.google.com/docs/admin/setup
        cred = credentials.Certificate("firebase_key.json")
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()

    def save_new_user(self, user):
        
        firebase_user = auth.create_user(
            email=user['email'],
            email_verified=False,
            password=user['password'],
            display_name=user['firstName'],
            #phone_number='+15555550100',
            #http://www.example.com/12345678/photo.png',
            disabled=False)
        
        user_id = firebase_user.uid

        # Remove password because users table is stored in plain text
        del user['password']

        # Force certain fields to lower case for easier comparison and uniformity
        user['email'] = user['email'].lower()
        user['sport'] = user['sport'].lower()
        user['profileType'] = user['profileType'].lower()
        
        self.db.collection('users').document(user_id).set(user)    

    
    def create_message(self, message):
        new_message_id = self.db.collection('messages').document().id
        self.db.collection('messages').document(new_message_id).set(message)
    
    def create_event(self, event):
        new_event_id = self.db.collection('events').document().id
        self.db.collection('events').document(new_event_id).set(event)

    #TODO: this is a slow operation, probably because of the chunking. could possibly
    # be made faster by chaining a new "where" clause for each chunk or for each zip code
    # so only one query needs to be executed
    def get_coaches(self, zip_code_objs, sport):
        """Returns a list of coaches that are in the given zip codes sorted by distance

        Args:
            zip_code_objs: List of zip code dictionaries of the form {'zip_code': 'XXXXX',
            'distance':YY.YY, city:'ZZZZ', state:'SS'}
            sport: Sport

        Returns:
            coach_list: The user's ID

        Raises:
            Error: If a Firebase error occurs
        """
        
        # Create a dictionary that maps the zip code to the distance, city, and state
        zip_codes_dict={z['zip_code'] : {'distance': z['distance'], 'city': z['city'], 'state': z['state']} for z in zip_code_objs}

        # Get list of the zip codes from dictionary keys
        zip_codes_list = list(zip_codes_dict.keys())

        # Break list of zip codes into indiviudal lists of 10 because Firebase's "in"
        # operator only supports up to 10 values per query
        list_chunks = list(chunks(zip_codes_list, 10))

        # Query to find coaches with a zip code in any of the list chunks  
        coach_list = []
        for l in list_chunks:
            coaches = self.db.collection('users').where('profileType','==','coach').where('zipCode', 'in', l)
            if sport is not None:
                coaches = coaches.where('sport', '==', sport)
            for document in coaches.stream():

                # Add distance, city, and state to coach object
                coach = document.to_dict()
                coach['distance'] = zip_codes_dict[coach['zipCode']]['distance']
                coach['city'] = zip_codes_dict[coach['zipCode']]['city']
                coach['state'] = zip_codes_dict[coach['zipCode']]['state']
                coach['firebaseID'] = document.id
                coach_list.append(coach)

        # Sort list of coaches by distance
        return sorted(coach_list, key=itemgetter('distance')) 

    def get_messages(self, id):
        messages_dict = {}
        recieved_messages = self.db.collection('messages').where('to', '==', id)
        sent_messages = self.db.collection('messages').where('from', '==', id)
        for document in recieved_messages.stream():
            msg = document.to_dict()
            if msg['from'] not in messages_dict:
                messages_dict[msg['from']] = []
            messages_dict[msg['from']].append(msg)

        for document in sent_messages.stream():
            msg = document.to_dict()
            if msg['to'] not in messages_dict:
                messages_dict[msg['to']] = []
            messages_dict[msg['to']].append(msg)

        conversations_dict = {}
        for conversation in messages_dict:
            messages_dict[conversation] = sorted(messages_dict[conversation], key=lambda message: message['time'])
            conversations_dict[conversation] = self.db.collection('users').document(conversation).get().to_dict()
        return messages_dict, conversations_dict
    
    def get_profile(self, id):
        
        doc_ref = self.db.collection('users').document(id)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()

        raise ValueError("No profile found for given ID")

    def update_profile(self, id, fields):
        doc_ref = self.db.collection('users').document(id)
        doc_ref.set(fields, merge=True)
        doc = doc_ref.get()
        if doc.exists:
            return fields

        raise ValueError("No profile found for given ID")

    def verify_token_header(self, headers):
        """Verifies a provided authorization header contains a valid JWT.

        Ensures that the token is current, issued
        to this project, and correctly signed by Google.

        Args:
            headers: The EnvironHeaders object obtained from any HTTP request

        Returns:
            user_id: The user's ID

        Raises:
            ValueError: If ``id_token`` is a not a string or is empty.
            InvalidIdTokenError: If ``id_token`` is not a valid Firebase ID token.
            ExpiredIdTokenError: If the specified ID token has expired.
            RevokedIdTokenError: If ``check_revoked`` is ``True`` and the ID token has been revoked.
            CertificateFetchError: If an error occurs while fetching the public key certificates
                required to verify the ID token.
        """

        auth_header = headers.get('Authorization')
        if auth_header == "" or auth_header == None:
            raise ValueError('No auth header found')
        
        parts = auth_header.split(' ')
        if len(parts) != 2:
            raise ValueError("malformed auth header")

        decoded_token = auth.verify_id_token(parts[1])
        if decoded_token == "":
            raise ValueError("unknown error validating token")
        
        return decoded_token['user_id']

def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]