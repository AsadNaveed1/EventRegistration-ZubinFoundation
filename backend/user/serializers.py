from rest_framework import serializers
from .models import User, RSVP, Event
from django.contrib.auth import authenticate
from event_manager.utils import generate_jwt_token
from event_manager.errors import ERORRS
from event_manager.settings import SIMPLE_JWT

import jwt


class UserSerializer(serializers.ModelSerializer):
    """Handles serialization and deserialization of User objects."""

    # Passwords must be at least 8 characters, but no more than 128
    # characters. These values are the default provided by Django. We could
    # change them, but that would create extra work while introducing no real
    # benefit, so lets just stick with the defaults.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    class Meta:
        model = User
        fields = ('id', 'username', 'full_name', 'password', 'email', )

    def update(self, instance, validated_data):
        """Performs an update on a User."""

        # Passwords should not be handled with `setattr`, unlike other fields.
        # Django provides a function that handles hashing and
        # salting passwords. That means
        # we need to remove the password field from the
        # `validated_data` dictionary before iterating over it.
        validated_data.pop('password', None)

        for (key, value) in validated_data.items():
            # For the keys remaining in `validated_data`, we will set them on
            # the current `User` instance one at a time.
            setattr(instance, key, value)

        # After everything has been updated we must explicitly save
        # the model. It's worth pointing out that `.set_password()` does not
        # save the model.
        instance.save()

        return instance


class RegistrationSerializer(serializers.ModelSerializer):
    """Serializers registration requests and creates a new user."""

    # Ensure passwords are at least 8 characters long, no longer than 128
    # characters, and can not be read by the client.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    # The client should not be able to send a token along with a registration
    # request. Making `token` read-only handles that for us.
    # token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        # List all of the fields that could possibly be included in a request
        # or response, including fields specified explicitly above.
        fields = ['id', 'email', 'username', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        # Use the `create_user` method we wrote earlier to create a new user.
        return User.objects.create_user(**validated_data)


class PasswordResetSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=255)
    token = serializers.CharField(max_length=255, required=False)

    class Meta:
        model = User
        fields = ['email', 'token']

    def update(self, instance, validated_data):
        email = validated_data.get('email', None)
        try:
            user = User.objects.get(email=email)
        except:
            # user = None
            raise serializers.ValidationError(ERORRS['ERROR_USER_NOT_FOUND'])
        # if user is None:
        token = generate_jwt_token(1)
        user.token = token
        user.save()
        return user

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    interests = InterestSerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'contact_number', 'interests']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'date', 'category', 'ask_questions']

class RSVPSerializer(serializers.ModelSerializer):
    class Meta:
        model = RSVP
        fields = ['id', 'user', 'event', 'questions', 'created_at']