from django.db import models

from django.contrib.postgres.fields import ArrayField
from user.models import User


class Event(models.Model):
    image_src = models.URLField()
    title = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255)
    eventid = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.eventid
    




# Define the field first
many_to_many_events_field = models.ManyToManyField(Event, related_name='users')
many_to_many_users_field = models.ManyToManyField(User, related_name='events')

# Then add it to the model
# User.add_to_class('registered_events', many_to_many_events_field)



Event.add_to_class('registered_users', many_to_many_users_field)
