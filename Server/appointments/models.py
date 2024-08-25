from django.db import models

class Appointment(models.Model):
    type = models.CharField(max_length=100)
    time = models.CharField(max_length=50)
    details = models.TextField()
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.type} at {self.time}"