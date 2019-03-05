import os
from config.environment import domainUrl
from twilio.rest import Client


def send_text_message(sale_id, sale_title):
    # Your Account SID from twilio.com/console
    account_sid = os.getenv('TWILLIO_SID')
    # Your Auth Token from twilio.com/console
    auth_token = os.getenv('TWILLIO_TOKEN')

    client = Client(account_sid, auth_token)

    sale_title = sale_title.replace(' ', '-').replace('%', 'percent')

    message = client.messages.create(
        to="+33752755762",
        from_="+33644642413",
        body=f'Hi it\'s Gather here, check this new Flash Sale next \
        to you {domainUrl}sales/{sale_id}/{sale_title}'
    )

    print(message.sid)
