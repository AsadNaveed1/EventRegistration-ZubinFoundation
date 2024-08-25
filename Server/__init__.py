from __future__ import absolute_import, unicode_literals

# 确保这不会在 Django 启动时加载
from .celery_app import app as celery_app

__all__ = ('celery_app',)