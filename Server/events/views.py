
# Create your views here.
import json
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import render
from .models import Event
from user.models import User
from django.views.decorators.csrf import csrf_exempt

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

@csrf_exempt
def all_events(request):
    if request.method == 'GET':
        data = {
            "message": "This is a GET request",
            'status': 'success'
        }
        events = Event.objects.all()  # 从 PostgreSQL 中提取所有 Product 数据
        
        event_list = list(events.values())
        
        data["info"] = event_list
        return JsonResponse(data)
    
    
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
def add_event_to_user(request):
    if request.method == 'POST':
        try:
            
            data = json.loads(request.body)
            event_id = data.get('event_id')
            user_id = data.get('user_id')
 
 
            
  
            user = User.objects.get(pk=user_id)
            event = Event.objects.get(pk=event_id)
            
  
            user.events.add(event)
            
  
            return JsonResponse({'message': 'Event added to user successfully', 'status': 'success', }, status=200)
        
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
def get_user_events(request):
    if request.method == 'Get':
        try:
            # 1. Parse the JSON body of the request
            body = json.loads(request.body)
            
            # 2. Extract email from the JSON data
            email = body.get('email')
            
            if not email:
                # Missing email parameter
                return JsonResponse({
                    'status': 'error',
                    'message': 'Email parameter is required'
                }, status=400)
            
            # 3. Retrieve the user by email
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return JsonResponse({
                    'status': 'error',
                    'message': 'User not found'
                }, status=404)
            
            # 4. Get the events registered by the user
            events = user.registered_events.all()
            
            # 5. Extract event names
            event_titles = [event.title for event in events]
            
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


