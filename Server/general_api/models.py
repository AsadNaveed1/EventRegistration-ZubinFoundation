from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class User(models.Model):
    admin_code = models.CharField(max_length=100, null=True)
    age = models.IntegerField(null=True)
    email = models.EmailField(max_length=100)
    ethnicity = models.CharField(max_length=100, null=True)
    gender = models.CharField(max_length=100, null=True)
    interest = ArrayField(models.CharField(max_length=100), size=5, blank=True, null=True)
    user_type = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=100, null=True)
    username = models.CharField(max_length=100)
    user_id = models.AutoField(primary_key=True)


    def __str__(self):
        return self.username
    



class Event(models.Model):
    image_src = models.URLField()  # 用于存储图像 URL
    title = models.CharField(max_length=255)  # 事件标题
    date = models.DateField()  # 事件日期
    time = models.TimeField()  # 事件时间
    location = models.CharField(max_length=255)  # 事件地点
    eventid = models.CharField(max_length=255, unique=True)  # 事件 ID，确保唯一

    def __str__(self):
        return self.title
    

User.add_to_class('events', models.ManyToManyField(Event, related_name='users'))