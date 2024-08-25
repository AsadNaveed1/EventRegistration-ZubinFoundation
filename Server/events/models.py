from django.db import models
from datetime import timedelta

from django.contrib.postgres.fields import ArrayField
from user.models import User


class Event(models.Model):
    

    # event main infro
    event_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    
    start_datetime = models.DateTimeField()  # 使用 DateTimeField 來表示事件的開始時間
    end_datetime = models.DateTimeField()     
    location = models.CharField(max_length=255)
    capacity = models.IntegerField()  # Add this line to include the capacity field
    description = models.TextField(null=True, blank=True)
    image_src = models.URLField()
    event_type = models.CharField(max_length=30, blank=True, null=True)
    
    # user trait
    interests = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    required_skills = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    gender = models.CharField(max_length=100, blank=True, null=True)
    '''["All", "Male", "Female"]'''

    language = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    learning_materials = ArrayField(models.CharField(max_length=255), blank=True, null=True)
    

    # def save(self, *args, **kwargs):
    #     if self.start_datetime and not self.end_datetime:
    #         self.end_datetime = self.start_datetime + timedelta(hours=1)
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.eventid
    




# Define the field first
many_to_many_events_field = models.ManyToManyField(Event, related_name='registered_users', blank=True)
many_to_many_users_field = models.ManyToManyField(User, related_name='registered_events',  blank=True)

# Then add it to the model
# User.add_to_class('registered_events', many_to_many_events_field)



# Event.add_to_class('registered_users', many_to_many_users_field)
