import json
from django.http import HttpResponse, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from user.models import User
# Create your views here.

@csrf_exempt
def signup(request):
    if request.method == 'POST':

        # get all parameters from the request.body
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        # perform validation on the parameters
        if not username or not email or not password:
            return HttpResponseServerError("Error: Missing parameters")
        
        # create User entity object
        user = User(
            username=username,
            email=email,
            password=password,
            user_type='Participant'
        )

        # save the user object to the database
        user.save()

        return HttpResponse("Success: User created", status=200)