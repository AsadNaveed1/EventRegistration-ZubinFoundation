import json
from django.http import HttpResponse, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from user.models import User
# Create your views here.

@csrf_exempt
def signup(request):
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
        if not username or not password:
            return HttpResponseServerError("Error: Missing parameters")

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