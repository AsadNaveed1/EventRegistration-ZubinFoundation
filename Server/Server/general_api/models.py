from django.db import models
from django.contrib.postgres.fields import ArrayField

class Event(models.Model):
    image_src = models.URLField()
    title = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255)
    eventid = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.eventid