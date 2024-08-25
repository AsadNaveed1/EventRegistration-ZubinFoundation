from django.urls import path
from . import views
from .views import get_data, book_appointment, get_myappointments


urlpatterns = [
    path('appointments/', views.get_data),
    path('book/<int:pk>/', views.book_appointment, name='book-appointment'),
    path('myappointments/', views.get_myappointments),
    path('unbook/<int:pk>/', views.unbook_appointment, name='unbook-appointment'),
]