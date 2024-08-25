from django.urls import path
from . import views
from .views import get_data, book_appointment


urlpatterns = [
    path('appointments/', views.get_data),
    path('book/<int:pk>/', views.book_appointment, name='book-appointment'),
]