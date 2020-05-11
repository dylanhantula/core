import re

def validate_create_user(user):
    """Checks if all of the fields are correct in a new user

    Args:
        user: User

    Returns:
        valid: Boolean indicating if the zip is valid
    """
    if not valid_zip(user['zipCode']):
        raise ValueError('Invalid zip code')

    if not user['profileType'] == 'coach' and not user['profileType'] == 'athlete':
        raise ValueError('Profile Type must be either "coach" or "athlete"')
    
    return ""

def valid_zip(zip):
    """Checks if a provided input is a valid zip code

    Args:
        zip: Zip Code

    Returns:
        valid: Boolean indicating if the zip is valid
    """
    pattern = re.compile("^[0-9]{5}(?:-[0-9]{4})?$")
    return pattern.match(zip)