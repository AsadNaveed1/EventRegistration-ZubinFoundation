# Create your models here.


from django.urls import path

from . import views

urlpatterns = [
    path("all_events", views.all_events),
    path("find_event", views.find_event),
    # path("create_event", views.add_event),
    path("add_event_to_user", views.add_event_to_user),
    path("unregister", views.remove_event_from_user),
    path("add_event", views.add_event),
    path("user_all_events",views.get_user_events),
    path("remove_user_from_event", views.remove_user_from_event)


]