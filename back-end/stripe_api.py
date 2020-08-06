import stripe
stripe.api_key = open("stripe_api_key", "r").read()


class StripeAPI: 
    def __init__(self): 
        key_file = open("stripe_api_key", "r")
        stripe.api_key = key_file.read()
        self.key = stripe.api_key
    
    def create_payment(self, data): 
        intent = stripe.PaymentIntent.create(
            amount=1400,
            currency='usd'
        )
        return intent

