from django.db import models

from django.contrib.postgres.fields import ArrayField
from user.models import User


class Event(models.Model):
    image_src = models.URLField()

    # event main infro
    
    title = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255)
    # eventid = models.CharField(max_length=255, unique=True)
    description = models.TextField(null=True, blank=True)

    # user trait
    interests = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    required_skills = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    gender = models.CharField(max_length=100, blank=True, null=True)
    language = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    event_id = models.AutoField(primary_key=True)
    # registered_users = models.ManyToManyField('user.User', related_name='registered_events', blank=True)

    def __str__(self):
        return self.eventid
    




# Define the field first
many_to_many_events_field = models.ManyToManyField(Event, related_name='registered_users', blank=True)
many_to_many_users_field = models.ManyToManyField(User, related_name='registered_events',  blank=True)

# Then add it to the model
# User.add_to_class('registered_events', many_to_many_events_field)



# Event.add_to_class('registered_users', many_to_many_users_field)
