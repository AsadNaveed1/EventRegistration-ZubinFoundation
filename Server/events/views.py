
# Create your views here.
import datetime
import json
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import render
from .models import Event
from user.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Event
from .serializers import EventSerializer
from user.serializers import UserSerializer
from reminder.send_message import send_whatsapp_message, create_event_register_message,send_sms_message
from django.utils import timezone
from reminder.send_message import send_sync_reminder_message

# Create your views here.

### Internal Method ###
@csrf_exempt
def find_event_by_id(event_id: str) -> str:
    try:
        # Find the Event object that matches the given event name
        event = Event.objects.get(id=event_id)
        # Return the ID of the found event as a string
        return event
    except Event.DoesNotExist:
        # If no event is found with the given name, return a message
        return "Event not found"

### Request ####
'''
Get Method
See all the events of a user
return:  
'''
@csrf_exempt
def all_events(request):
    if request.method == 'GET':
        data = {
            "message": "This is a GET request",
            'status': 'success'
        }
        events = Event.objects.all()  # Fetch all events from the database

        # Serialize the event data, including registered users
        serializer = EventSerializer(events, many=True)
        event_list = serializer.data
        
        data["info"] = event_list
        return JsonResponse(data, safe=False)  # Return the serialized data as a JSON response
    
    else:
        data = {
            "message": "Invalid request method.",
            'status': 'error'
        }
        return JsonResponse(data)

'''
Post Method
add a event to a user 
Param: userid, event_name/ userid, eventid
return: 
'''
@csrf_exempt
def add_event_to_user(request):
    if request.method == 'POST':
        try:
            
            # Get parameters
            data = json.loads(request.body)
            event_id = data.get('event_id')
            user_id = data.get('user_id')
             
            # Find user and event object
            user = User.objects.get(pk=user_id)
            event = Event.objects.get(pk=event_id)
            
            # Apply the ManyToMant Relation
            user.registered_events.add(event)
            user.save()
            ####

            # Send notification message once user registered
            notification_message = create_event_register_message(event)
            send_whatsapp_message("+85252243017", notification_message)
            # send_sms_message("+85252243017", notification_message)
            
            # Schedule reminder task

            # start_datetime = datetime.fromisoformat(event.start_datetime)
            # reminder_time = start_datetime - datetime.timedelta(hours=1)
            # if reminder_time > timezone.now():
            #     send_sync_reminder_message.apply_async(
            #             (user.phone_number, event),
            #             eta=reminder_time
            #         )

            # 使用序列化器將用戶對象轉換為 JSON
            serializer = UserSerializer(user)
            user_data = serializer.data

  
            return JsonResponse({'message': 'Event added to user successfully', 'status': 'success', "user":user_data }, status=200)
        
        except User.DoesNotExist:
            return JsonResponse({'message': 'User not found', 'status': 'error'}, status=404)
        
        except Event.DoesNotExist:
            return JsonResponse({'message': 'Event not found', 'status': 'error'}, status=404)
        
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON', 'status': 'error'}, status=400)
    
    return JsonResponse({'message': 'Invalid request method', 'status': 'error'}, status=405)


'''
Get Method
See all the events of a user
Param: user email 
return: 
'''
@csrf_exempt
def get_user_events(request):
    if request.method == 'POST':
        try:
            # 1. Parse the JSON body of the request
            body = json.loads(request.body)
            
            # 2. Extract email from the JSON data
            userID = body.get('user_id')
            
            if not userID:
                # Missing email parameter
                return JsonResponse({
                    'status': 'error',
                    'message': 'UserID parameter is required'
                }, status=400)
            
            # 3. Retrieve the user by email
            try:
                user = User.objects.get(user_id=userID)
            except User.DoesNotExist:
                return JsonResponse({
                    'status': 'error',
                    'message': 'User not found'
                }, status=404)
            
            # 4. Get the events registered by the user
            events = user.registered_events.all()
            
            # 5. Extract event names
            event_titles = [{"event_id":event.event_id,"title":event.title} for event in events]
            
            # 6. Return event names in the response
            return JsonResponse({
                'status': 'success',
                'message': 'Events retrieved successfully',
                'events': event_titles
            }, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({
                'status': 'error',
                'message': 'Invalid JSON'
            }, status=400)
    
    return JsonResponse({
        'status': 'error',
        'message': 'Invalid request method'
    }, status=405)




@csrf_exempt
def add_event(request): ## tested
    if request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'message': 'Invalid request method', 'status': 'error'}, status=405)
