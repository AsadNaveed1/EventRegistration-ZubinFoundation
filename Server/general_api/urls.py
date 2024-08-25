
from django.urls import path

from . import views

urlpatterns = [
    path("all_events", views.all_events),
    path("update_user_info", views.update_user_info),
    path("get_user_events", views.get_user_events),
    path("add_event_to_user", views.add_event_to_user),
]

