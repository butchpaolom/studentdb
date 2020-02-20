from django.urls import path, include
from .views import *


urlpatterns = [
    path('', landing, name='landing'),
    path('batch', batch, name='batch'),
    path('home', home, name='home'),
]   

#/web/api/