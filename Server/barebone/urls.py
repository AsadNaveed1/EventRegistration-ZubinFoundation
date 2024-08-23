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
from django.contrib import admin
from django.urls import path, include

# For JWT
from zubin_auth.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('webadmin/', admin.site.urls),
    
    path('volunteer/', include("volunteer.urls")),
    path('zubin_admin/', include("zubin_admin.urls")),
    path('community_member/', include("community_member.urls")),

    # For JWT
    path("zubin_auth/user/register/", CreateUserView.as_view(), name="register"),
    path("zubin_auth/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("zubin_auth/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("zubin_auth/", include("rest_framework.urls")),
    path('zubin_auth/', include("zubin_auth.urls")),
    
]
