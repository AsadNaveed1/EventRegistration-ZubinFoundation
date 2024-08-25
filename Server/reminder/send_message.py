import os
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from celery import shared_task

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


@shared_task
def send_sync_reminder_message(user_phone_number, event):

    
    message_body = create_reminder_message(event)
    # Send SMS message
    sms_result = send_sms_message(user_phone_number, message_body)
    
    # Send WhatsApp message
    whatsapp_result = send_whatsapp_message(user_phone_number, message_body)
    
    # Log or handle the results
    print(f"SMS result: {sms_result}")
    print(f"WhatsApp result: {whatsapp_result}")
    
    


def create_event_register_message(event):
        # Format the start_datetime and end_datetime fields
    start_date = event.start_datetime.strftime("%Y-%m-%d")
    start_time = event.start_datetime.strftime("%H:%M:%S")
    end_date = event.end_datetime.strftime("%Y-%m-%d")
    end_time = event.end_datetime.strftime("%H:%M:%S")

    message_body = (
        f"Hello! You've been registered for the following event:\n\n"
        f"Event: {event.title}\n"  # Accessing the event title using dot notation
        f"Start Date: {start_date}\n"    # Accessing the event start date using dot notation
        f"Start Time: {start_time}\n"    # Accessing the event start time using dot notation
        f"End Date: {end_date}\n"    # Accessing the event end date using dot notation
        f"End Time: {end_time}\n"    # Accessing the event end time using dot notation
        f"Location: {event.location}\n\n"
        f"Thank you for registering. We look forward to seeing you there!"
    )
    # message_body = (
    #     f"Hello! You've been registered for the following event:\n\n"
    #     f"Event: {event.title}\n"  # Accessing the event name using dot notation
    #     f"Date: {event.date}\n"    # Accessing the event date using dot notation
    #     f"Time: {event.time}\n"    # Accessing the event time using dot notation
    #     f"Location: {event.location}\n\n"
    #     f"Thank you for registering. We look forward to seeing you there!"
    # )
    return message_body

def create_reminder_message(event):
    message_body = (
        f"Hello! You've been registered for the following event:\n\n"
        f"Event: {event.title}\n"  # Accessing the event name using dot notation
        f"Date: {event.date}\n"    # Accessing the event date using dot notation
        f"Time: {event.time}\n"    # Accessing the event time using dot notation
        f"Location: {event.location}\n\n"
        
        f"Reminder: The event '{event.title}' is starting at {event.starttime}."
    )
    return message_body


# Example of how to use the function
if __name__ == '__main__':
    recipient_number = '+85252243017'
    message = 'Your appointment is coming up on July 21 at 3PM'
    result = send_sms_message(recipient_number, message)
    print(result)