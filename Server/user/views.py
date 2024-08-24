import json
from django.http import HttpResponse, HttpResponseServerError, JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from user.models import User
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
        # get all parameters from the request.body
        data = json.loads(request.body)
        username = data.get('fullName')
        password = data.get('password')
        email = data.get('email')
        admin_code = data.get('adminCode')
        age = data.get('age')
        ethnicity = data.get('ethnicity')
        gender = data.get('gender')
        interests = data.get('interests')
        residence = data.get('residence')
        user_type = data.get('userType')
        print(username, password, email, admin_code, age, ethnicity, gender, interests, residence, user_type, flush=True)

        # perform validation on the parameters
        if not username or not password or not email or not user_type:
            return HttpResponseServerError("Error: Missing required parameters")
        
        already_exists = User.objects.filter(email=email).exists()
        if already_exists:
            return HttpResponseServerError("Error: User already exists")

        # create User entity object
        user = User(
            username=username,
            password=password,
            email=email,
            admin_code=admin_code,
            age=age,
            ethnicity=ethnicity,
            gender=gender,
            interests=interests,
            residence=residence,
            user_type=user_type
        )
        # save the user object to the database
        user.save()
        return HttpResponse("Success: User created", status=200)
    else:
        return HttpResponseServerError("Error: Invalid request method")
    
@csrf_exempt
def get_all_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        user_list = dict(users.values())
        return JsonResponse(user_list, status=200)
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