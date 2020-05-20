import re

def validate_create_user(user):
    """Checks if all of the fields are correct in a new user

    Args:
        user: User

    """
    if not valid_zip(user['zipCode']):
        raise ValueError('Invalid zip code')

    if not user['profileType'] == 'coach' and not user['profileType'] == 'athlete':
        raise ValueError('Profile Type must be either "coach" or "athlete"')
    

def validate_coach_filters(zip, radius, sport):
    """Checks if all of the fields are correct for getting coaches using filters

    Rules:
        - Zip code must always be present
        - If radius is present, it must be greater than 0 and less than 50 (miles)
        - Sport can be anything at this time. In the future this could be restricted

    Args:
        zip: Zip code
        radius: Radius in number of miles
        sport: Sport

    """
    
    if zip is None or not valid_zip(zip):
        raise ValueError('Invalid zip code')
    
    if radius is not None and not valid_int(radius):
        raise ValueError('Radius is not a valid integer')

    if radius is not None and (int(radius) > 50 or int(radius) < 0):
        raise ValueError('Radius must be between 0 and 50 miles')
    

def valid_zip(zip):
    """Checks if a provided input is a valid zip code

    Args:
        zip: Zip code

    Returns:
        valid: Boolean indicating if the zip is valid
    """
    pattern = re.compile("^[0-9]{5}(?:-[0-9]{4})?$")
    return pattern.match(zip)

def valid_int(s):
    """Checks if a provided input is a valid integer

    Args:
        s: input (usually string)

    Returns:
        valid: Boolean indicating if the input is an integer
    """
    try: 
        int(s)
        return True
    except ValueError:
        return False