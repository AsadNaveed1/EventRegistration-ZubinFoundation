from celery import shared_task
from twilio.rest import Client
from django.conf import settings
from .send_message import create_event_register_message, create_reminder_message, send_sms_message, send_whatsapp_message
@shared_task
def send_reminder_message(user_phone_number, event):

    
    message_body = f"Reminder: The event '{event_name}' is starting at {event_time}."
    
    message = client.messages.create(
        body=message_body,
        from_=settings.TWILIO_PHONE_NUMBER,
        to=f'whatsapp:{user_phone_number}'
    )
    
    return message.sid