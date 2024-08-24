
from django.urls import path

from . import views

urlpatterns = [
    path("all_events", views.all_events),
    path("find_event", views.find_event_by_id),
    # path("create_event", views.add_event),
    path("add_event_to_user", views.add_event_to_user),


]

