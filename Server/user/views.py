import json
from django.http import HttpResponse, HttpResponseServerError, JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from user.models import User
from .serializers import UserSerializer
from rest_framework.parsers import JSONParser

# Create your views here.

@csrf_exempt
def login(request):
    print(request.session)
    if request.session.get('user_id') is not None:
        user = User.objects.get(user_id=request.session.get('user_id'))
        return JsonResponse({ "message": "User authenticated", "user_type": user.user_type }, status=200)
    else:
        if request.method == 'POST':
            # get all parameters from the request.body
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # perform validation on the parameters
            if not email or not password:
                return HttpResponseServerError("Error: Missing required parameters")

            # authenticate the user
            user = User.objects.get(email=email)
            if user is None:
                return HttpResponseServerError("Error: User not found")
            if user.password != password:
                return HttpResponseServerError("Error: Incorrect password")
            request.session['user_id'] = user.user_id
            return JsonResponse({ "message": "User authenticated", "user_type": user.user_type }, status=200)
        else:
            return HttpResponseServerError("Error: Invalid request method")

@csrf_exempt
def sign_up(request):
    if request.method == 'POST':
        # Parse JSON data from the request
        data = JSONParser().parse(request)
        
        # Create a UserSerializer instance with the incoming data
        serializer = UserSerializer(data=data)
        
        if serializer.is_valid():
            # Save the new user if the data is valid
            serializer.save()
            return JsonResponse({'message': 'Success: User created'}, status=201)
        else:
            # Return errors if the data is invalid
            return JsonResponse(serializer.errors, status=400)
    else:
        return HttpResponseServerError("Error: Invalid request method")
# def sign_up(request):
#     if request.method == 'POST':
#         # get all parameters from the request.body
#         data = json.loads(request.body)
#         username = data.get('fullName')
#         password = data.get('password')
#         email = data.get('email')
#         admin_code = data.get('adminCode')
#         age = data.get('age')
#         ethnicity = data.get('ethnicity')
#         gender = data.get('gender')
#         interests = data.get('interests')
#         residence = data.get('residence')
#         user_type = data.get('userType')
#         print(username, password, email, admin_code, age, ethnicity, gender, interests, residence, user_type, flush=True)

#         # perform validation on the parameters
#         if not username or not password or not email or not user_type:
#             return HttpResponseServerError("Error: Missing required parameters")
        
#         already_exists = User.objects.filter(email=email).exists()
#         if already_exists:
#             return HttpResponseServerError("Error: User already exists")

#         # create User entity object
#         user = User(
#             username=username,
#             password=password,
#             email=email,
#             admin_code=admin_code,
#             age=age,
#             ethnicity=ethnicity,
#             gender=gender,
#             interests=interests,
#             residence=residence,
#             user_type=user_type
#         )
#         # save the user object to the database
#         user.save()
#         return HttpResponse("Success: User created", status=200)
#     else:
#         return HttpResponseServerError("Error: Invalid request method")
    
@csrf_exempt
def get_all_users(request):
    if request.method == 'GET':
        users = User.objects.all()  # Get all users
        serializer = UserSerializer(users, many=True)  # Serialize the queryset
        return JsonResponse(serializer.data, safe=False, status=200)  # Return the serialized data as JSON
    else:
        return HttpResponseServerError("Error: Invalid request method")
    
@csrf_exempt
def find_user(request):
    if request.method == 'GET':
        body = request.body
        data = json.loads(body)
        
        user_id = data.get('user_id')
        user = User.objects.get(user_id=user_id)
                    
        if user is None:
            return JsonResponse({'message': 'User not found'}, status=404)
        else:
            return JsonResponse(user, status=200)
    else:
        return HttpResponseServerError("Error: Invalid request method")
    
@csrf_exempt
def log_out(request):
    if request.method == 'POST':
        request.session.flush()
        return HttpResponse("Success: User logged out", status=200)
    else:
        return HttpResponseServerError("Error: Invalid request method")
    
@csrf_exempt
def user_all_event_url(request, user_id):
    if request.method == 'GET':
        try:
            user = User.objects.get(user_id=user_id)
            serializer = UserSerializer(user)
            # Return only the 'registered_events' part of the serialized data
            return JsonResponse(serializer.data['registered_events'], safe=False, status=200)
        except User.DoesNotExist:
            return JsonResponse({'message': 'User not found'}, status=404)
    else:
        return HttpResponseServerError("Error: Invalid request method")

@csrf_exempt
def find_user_url(request, user_id):
    if request.method == 'GET':
        try:
            user = User.objects.get(user_id=user_id)
            serializer = UserSerializer(user)
            return JsonResponse(serializer.data, status=200)
        except User.DoesNotExist:
            return JsonResponse({'message': 'User not found'}, status=404)
    else:
        return HttpResponseServerError("Error: Invalid request method")
    

@csrf_exempt
def update_user_info(request):
    if request.method == 'PUT':
        try:
            # 從請求的 JSON 數據中獲取數據
            data = json.loads(request.body)
            user_id = data.get('user_id')
            
            if not user_id:
                return JsonResponse({'error': 'user_id is required'}, status=400)
            
            # 查找用戶
            user = get_object_or_404(User, user_id=user_id)
            
            # 使用 UserSerializer 進行數據驗證和更新
            serializer = UserSerializer(user, data=data, partial=True)  # partial=True 允許部分更新
            
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)  # 返回更新後的數據和狀態碼
            else:
                return JsonResponse(serializer.errors, status=400)  # 返回錯誤信息和狀態碼
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)  # 返回錯誤信息和狀態碼



@csrf_exempt
def complete_materials(request):
    if request.method == 'POST':
        try:
            # Get parameters
            data = json.loads(request.body)
            user_id = data.get('user_id')
            new_materials = data.get('completed_materials', [])

            if not isinstance(new_materials, list):
                return JsonResponse({
                    'message': 'completed_materials should be an array of strings',
                    'status': 'error'
                }, status=400)

            # Find the user object
            user = User.objects.get(pk=user_id)

            # Get current completed materials
            if  user.completed_materials is None:
                user.completed_materials = list(new_materials)
            else:
                current_materials = set(user.completed_materials)

                # Merge new materials, avoiding duplicates
                updated_materials = current_materials.union(set(new_materials))

                # Update user with new materials
                user.completed_materials = list(updated_materials)
                user.save()

            return JsonResponse({
                'message': 'Completed materials updated successfully',
                'status': 'success',
                'completed_materials': user.completed_materials
            }, status=200)

        except User.DoesNotExist:
            return JsonResponse({
                'message': 'User not found',
                'status': 'error'
            }, status=404)

        except json.JSONDecodeError:
            return JsonResponse({
                'message': 'Invalid JSON',
                'status': 'error'
            }, status=400)

        except Exception as e:
            return JsonResponse({
                'message': str(e),
                'status': 'error'
            }, status=500)

    return JsonResponse({
        'message': 'Invalid request method',
        'status': 'error'
    }, status=405)