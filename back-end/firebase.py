from firebase_admin import auth, credentials, firestore
import firebase_admin

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
            #ttp://www.example.com/12345678/photo.png',
            disabled=False)
        
        user_id = firebase_user.uid

        # Remove password because users table is stored in plain text
        del user['password']
        
        self.db.collection('users').document(user_id).set(user)

        return {'test': 'test'}, 200
    
    def get_profile(self, id):
        
        print(id)
        doc_ref = self.db.collection('users').document(id)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()

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