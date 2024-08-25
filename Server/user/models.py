from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class User(models.Model):

    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    age = models.IntegerField(null=True)
    first_name = models.CharField(max_length=40, null=True)
    middle_name = models.CharField(max_length=40, null=True)
    last_name = models.CharField(max_length=40, null=True)
    ethnicity = models.CharField(max_length=100, null=True)
    gender = models.CharField(max_length=100, null=True)

    # Contacts
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(max_length=100)

    # Other info
    interests = ArrayField(models.CharField(max_length=100), size=5, blank=True, null=True)
    user_type = models.CharField(max_length=100)
    '''[Admin, Participant, Volunteer]'''
    password = models.CharField(max_length=100)
    residence = models.CharField(max_length=100, null=True)
    
    registered_events = models.ManyToManyField('events.Event', related_name='registered_users', blank=True)
    admin_code = models.CharField(max_length=100, null=True)  # Add this line
    completed_materials = ArrayField(models.CharField(max_length=100), size=5, blank=True, null=True)

    def __str__(self):
        return self.username
