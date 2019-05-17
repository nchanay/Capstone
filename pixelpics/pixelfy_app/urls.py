from django.urls import path
from . import views

app_name = 'pixelfy'  # for namespacing
urlpatterns = [
    path('', views.index, name='index'),
    path('profile/upload/', views.upload, name='upload'),
]
