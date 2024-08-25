import os
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

def send_sms_message(to_number, message_body):

    account_sid = 'ACfe0f894e5eaad2ce03738fa6597bb6cf'
    auth_token = '2d976826cd51ff6578253e32e715c556'
    client = Client(account_sid, auth_token)
    try:
        message = client.messages.create(
        from_='+14123296675',
        to=to_number,
        body=message_body)

        return f"Message sent successfully! SID: {message.sid}"
    except TwilioRestException as e:
        return f"Failed to send message: {e}"

def send_whatsapp_message(to_number, message_body):
    """
    Sends a WhatsApp message using Twilio API.

    :param to_number: The recipient's WhatsApp number in the format 'whatsapp:+[country code][number]'.
    :param message_body: The message to send.
    :return: The SID of the sent message if successful, otherwise an error message.
    """

    
    account_sid = 'ACfe0f894e5eaad2ce03738fa6597bb6cf'
    auth_token = '2d976826cd51ff6578253e32e715c556'
    client = Client(account_sid, auth_token)

    try:
        message = client.messages.create(
            from_='whatsapp:+14155238886',  # This is Twilio's WhatsApp sandbox number
            body=message_body,
            to='whatsapp:'+to_number
        )
        return f"Message sent successfully! SID: {message.sid}"
    except TwilioRestException as e:
        return f"Failed to send message: {e}"


def create_message(event):
    message_body = (
        f"Hello! You've been registered for the following event:\n\n"
        f"Event: {event.title}\n"  # Accessing the event name using dot notation
        f"Date: {event.date}\n"    # Accessing the event date using dot notation
        f"Time: {event.time}\n"    # Accessing the event time using dot notation
        f"Location: {event.location}\n\n"
        f"Thank you for registering. We look forward to seeing you there!"
    )
    return message_body


# Example of how to use the function
if __name__ == '__main__':
    recipient_number = '+85252243017'
    message = 'Your appointment is coming up on July 21 at 3PM'
    result = send_sms_message(recipient_number, message)
    print(result)