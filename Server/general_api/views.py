import json
from django.contrib.auth import authenticate
from django.http import JsonResponse
from .models import Event
from user.models import User

### Internal Method ###
def find_eventID_by_event_name(event_name: str) -> str:
    try:
        # Find the Event object that matches the given event name
        event = Event.objects.get(title=event_name)
        # Return the ID of the found event as a string
        return str(event.id)
    except Event.DoesNotExist:
        # If no event is found with the given name, return a message
        return "Event not found"

'''
Put Method
Update a user information by email, password.
Param:  
return: all users
'''
def update_user_info(request):
    if request.method == 'PUT':
        try:
            # 1. Retrieve and parse JSON data from the request body
            body = request.body
            data = json.loads(body)
            
            # 2. Extract email and password for authentication
            email = data.get('email')
            password = data.get('password')
            
            # 3. Authenticate user using email and password
            user = authenticate(username=email, password=password)
            
            if user is not None:
                # 4. Update user data with all fields from the JSON body
                for key, value in data.items():
                    if key == "new_username":
                        setattr(user, "username", value)
                    elif key == 'new_password':
                    
                        setattr(user, "password", value) 
                    else:
                        
                        setattr(user, key, value)
                
                # 5. Save the updated user
                user.save()
                
                # 6. Return a success response
                return JsonResponse({'message': 'User updated successfully'}, status=200)
            else:
                # Authentication failed
                return JsonResponse({'error': 'Invalid email or password'}, status=401)
        
        except json.JSONDecodeError:
            # Handle invalid JSON
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    # Handle invalid request methods (anything other than PUT)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def all_events(request):
    if request.method == 'GET':
        data = {
            "message": "This is a GET request",
        }
        events = User.objects.all()  # 从 PostgreSQL 中提取所有 Product 数据
        event_list = list(events.values())
        data["info"] = event_list
        return JsonResponse(data)
    else:
        data = {
            "message": "Invalid request method.",
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
            # 1. 解析请求体中的 JSON 数据
            data = json.loads(request.body)
            
            # 2. 获取用户 ID 和事件 ID
            user_id = data.get('userid')
            if 'event_name' in data:
                event_id = find_eventID_by_event_name(data.get('event_name'))
                if event_id == "Event not found":
                    return JsonResponse({'message': 'Event not found','status': 'error'}, status=404)

            else:
                event_id = data.get('eventid')
            
            # 3. 查找用户和事件
            user = User.objects.get(pk=user_id)
            event = Event.objects.get(pk=event_id)
            
            # 4. 将事件添加到用户的 registered_events 列表中
            user.events.add(event)
            
            # 5. 返回成功响应
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
            events = user.events.all()
            
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
