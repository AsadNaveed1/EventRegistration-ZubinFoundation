from django.db import models
from django.contrib.postgres.fields import ArrayField
from user.models import User

class Module(models.Model):
    module_id = models.CharField(max_length=255)
    link = models.CharField(max_length=255)  # Added max_length
    title = models.CharField(max_length=255)
    status = models.BooleanField()
    image = models.CharField(max_length=255)  # Added max_length

    def __str__(self):
        return self.title

class Event(models.Model):
    image_src = models.URLField()
    title = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255)
    eventid = models.CharField(max_length=255, unique=True)
    required_modules = models.ManyToManyField(Module, blank=True)

    # Specify unique related names for each ManyToManyField
    volunteers = models.ManyToManyField(User, blank=True, related_name='volunteers')  
    participants = models.ManyToManyField(User, blank=True, related_name='participants')  
    capacity = models.IntegerField(null=True)  
    waitList = models.ManyToManyField(User, blank=True, related_name='waitlist')  

    def __str__(self):
        return f"{self.title} ({self.eventid})"
