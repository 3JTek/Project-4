import os
from twilio.rest import Client

domain = os.getenv('DEV_DOMAIN')

def send_text_message(sale_title):
    # Your Account SID from twilio.com/console
    account_sid = os.getenv('TWILLIO_SID')
    # Your Auth Token from twilio.com/console
    auth_token = os.getenv('TWILLIO_TOKEN')

    client = Client(account_sid, auth_token)
    
    message = client.messages.create(
        to="+33752755762",
        from_="+33644642413",
        body=f'Hi it\'s Gather here, check this new Flash Sale next to you {domain}/api/sales/{sale_title}'
    )

    print(message.sid)
