"""
URL configuration for barebone project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login),
    path('logout', views.logout),
    path('signup', views.sign_up),
    path("all_users", views.get_all_users),
    path("find_user", views.find_user),
    path("find_user/<int:user_id>", views.find_user_url),
    path("user_all_event/<int:user_id>", views.user_all_event_url),
    path("update_user_info", views.update_user_info),
    path("complete_materials", views.complete_materials)
]
