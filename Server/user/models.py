from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class User(models.Model):
    admin_code = models.CharField(max_length=100, null=True)
    age = models.IntegerField(null=True)
    email = models.EmailField(max_length=100)
    ethnicity = models.CharField(max_length=100, null=True)
    gender = models.CharField(max_length=100, null=True)
    interests = ArrayField(models.CharField(max_length=100), size=5, blank=True, null=True)
    user_type = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    residence = models.CharField(max_length=100, null=True)
    username = models.CharField(max_length=100)
    user_id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.username
