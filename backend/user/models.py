import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, BaseUserManager, PermissionsMixin
from user.user_manager import UserManager
from datetime import datetime, timedelta
import jwt
from django.core.validators import FileExtensionValidator


class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    age = models.PositiveSmallIntegerField()
    email = models.EmailField(db_index=True, unique=True)
    full_name = models.CharField(max_length=255)
    admin_code = models.CharField(max_length=255, null=True, default=None)
    user_type = models.CharField()
    INTEREST_CHOICES = {
        "MH": "Mental Health",
        "WG": "Women & Girls",
        "C": "Careers",
        "ER": "Emergency Relief",
        "F": "Family",
    }
    interests = models.CharField(max_length=50, choices=INTEREST_CHOICES)
    registered_events = models.CharField(max_length = 1000)
    ethnicity = models.CharField(max_length = 50, null=True)
    gender = models.CharField(max_length=25, null=True)
    contact_number = models.PositiveIntegerField(max_length=11)
    # requiredModules = 
    REMINDER_CHOICES = {
        "S": "SMS",
        "WA": "WhatsApp",
        "E": "Email",
    }
    reminderMethod = models.CharField(choices=REMINDER_CHOICES)
    frequency = models.PositiveIntegerField(default = 300, help_text="in mins")
    REQUIRED_FIELDS = ['email']

    # Tells Django that the UserManager class defined should manage
    # objects of this type.
    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.first_name + self.last_name

    def get_short_name(self):
        return self.first_name
    
class Event(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateTimeField()
    category = models.CharField(choices=User.INTEREST_CHOICES)
    ask_questions = models.BooleanField(default=False)

class RSVP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    questions = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)