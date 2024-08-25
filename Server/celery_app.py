from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# 设置 Django 的默认设置模块
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Server.settings')

app = Celery('Server')

# 使用 Django 配置文件来配置 Celery
app.config_from_object('django.conf:settings', namespace='CELERY')

# 从所有已注册的 Django 应用中加载任务模块
app.autodiscover_tasks()