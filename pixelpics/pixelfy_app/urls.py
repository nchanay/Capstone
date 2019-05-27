from django.urls import path
from . import views

app_name = 'pixelfy'  # for namespacing
urlpatterns = [
    path('', views.index, name='index'),
    path('like_post', views.like_post, name='like_post'),
    path('feed/best', views.index_best, name='best'),
    path('feed/year', views.index_year, name='year'),
    path('feed/month', views.index_month, name='month'),
    path('feed/week', views.index_week, name='week'),
    path('feed/day', views.index_day, name='day'),
    path('feed/<user>', views.index_user, name='user'),
    path('profile/upload/', views.upload, name='upload'),
]
