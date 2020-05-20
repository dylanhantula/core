import requests 

class ZipCodes:
    def __init__(self):

        # Get zip code api key from file
        key_file = open("zip_code_api_key","r") 
        self.key = key_file.read()

    def get_zip_codes_in_radius(self, zip_code, radius):
        if radius is None:
            radius = 0
        url = "https://www.zipcodeapi.com/rest/"+self.key+"/radius.json/"+str(zip_code)+"/"+str(radius)+"/miles"
        r = requests.get(url = url)

        return r.json()['zip_codes']