import os
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from celery import shared_task
from events.models import Event
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
    account_sid = 'ACfe0f894e5eaad2ce03738fa6597bb6cf'
    auth_token = '2d976826cd51ff6578253e32e715c556'
    client = Client(account_sid, auth_token)

    try:
        message = client.messages.create(
            from_='whatsapp:+14155238886',  # Twilio's sandbox number
            body=message_body,
            to='whatsapp:' + to_number,

        )

        return f"Message sent successfully! SID: {message}"
    except Exception as e:
        return f"Failed to send message: {e}"






def create_event_register_message(event):

    start_date = event.start_datetime.strftime("%Y-%m-%d")
    start_time = event.start_datetime.strftime("%H:%M")
    end_date = event.end_datetime.strftime("%Y-%m-%d")
    end_time = event.end_datetime.strftime("%H:%M")

    message_body = (
        f"Greetings from Zubin Foundation! 🙂👋\n\n"
        f"Thanks so much for your interest in the {event.title} event! 🌟 "
        f"We are thrilled to extend an exclusive invitation to you for the event:\n\n"
        f"🗓 Event: {event.title}\n"
        f"📍 Location: {event.location}\n\n"
        f"---\n\n"
        f"🔔 Event Details:\n"
        f"📅 Start Date: {start_date}\n"
        f"🕒 Start Time: {start_time}\n"
        f"📅 End Date: {end_date}\n"
        f"🕓 End Time: {end_time}\n\n"
        f"---\n\n"
        f"Zubin Foundation\n"
        f"We are committed to improving the lives of Hong Kong's ethnic minorities. "
        f"Join us and connect with other members, our volunteers and mentors from different fields 💪🏼✨\n\n"
        f"We are looking forward to engaging with you there! 🙂🫶\n"
        f"https://www.zubinfoundation.org"

    )

    return message_body
    

def create_reminder_message(event):

    start_date = event.start_datetime.strftime("%Y-%m-%d")
    start_time = event.start_datetime.strftime("%H:%M")
    end_date = event.end_datetime.strftime("%Y-%m-%d")
    end_time = event.end_datetime.strftime("%H:%M")

    message_body = (
        f"Reminder: 🙂👋\n"
        f"The event {event.title} is starting at {start_date} {start_time}\n\n."
        f" Event: {event.title}\n"
        f"📍 Location: {event.location}\n\n"
        f"---\n\n"
        f"🔔 Event Details:\n"
        f"📅 Start Date: {start_date}\n"
        f"🕒 Start Time: {start_time}\n"
        f"📅 End Date: {end_date}\n"
        f"🕓 End Time: {end_time}\n\n"
        f"---\n\n"
        f"Zubin Foundation\n"
        f"We are committed to improving the lives of Hong Kong's ethnic minorities. "
        f"Join us and connect with other members, our volunteers and mentors from different fields 💪🏼✨\n\n"
        f"We are looking forward to engaging with you there! 🙂🫶\n"
        f"https://www.zubinfoundation.org"


    )


        
       
    return message_body