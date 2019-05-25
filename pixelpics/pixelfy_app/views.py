from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.db.models import Count
from django.http import HttpResponse
from django.core.files.base import ContentFile
from base64 import b64decode
from .models import *
from datetime import *


# Create your views here.
def index(request):
    feed = Pixelfy.objects.all().order_by('-created_date')
    return render(request, 'pixelfy_app/index.html', {'posts': feed})


def index_user(request, user):
    feed = Pixelfy.objects.filter(user__username=user).order_by('-created_date')
    return render(request, 'pixelfy_app/index.html', {'posts': feed})


def index_best(request):
    feed = Pixelfy.objects.annotate(like_count=Count('likes')).order_by('-like_count')
    return render(request, 'pixelfy_app/index.html', {'posts': feed})


def index_year(request):
    current = datetime.now()
    last_year = current - timedelta(days=365)
    feed = Pixelfy.objects.filter(created_date__gte=last_year).order_by('-created_date')
    return render(request, 'pixelfy_app/index.html', {'posts': feed})


def index_month(request):
    current = datetime.now()
    last_month = current - timedelta(days=30)
    feed = Pixelfy.objects.filter(created_date__gte=last_month).order_by('-created_date')
    return render(request, 'pixelfy_app/index.html', {'posts': feed})


def index_week(request):
    current = datetime.now()
    last_week = current - timedelta(days=7)
    feed = Pixelfy.objects.filter(created_date__gte=last_week).order_by('-created_date')
    return render(request, 'pixelfy_app/index.html', {'posts': feed})


def index_day(request):
    current = datetime.now()
    last_day = current - timedelta(days=1)
    feed = Pixelfy.objects.filter(created_date__gte=last_day).order_by('-created_date')
    return render(request, 'pixelfy_app/index.html', {'posts': feed})


@login_required
def upload(request):
    if request.method == "POST":
        original = request.FILES['original_image']
        ext, altered_b64 = request.POST['altered_image'].split(';base64,')
        ext = ext.split('/')[-1]
        altered = ContentFile(b64decode(altered_b64), name='temp.' + ext) # You can save this as file instance.

        print(original, type(original))
        print(altered, type(altered))
        post = Pixelfy(user=request.user, original_image=original, altered_image=altered)
        post.save()
        return redirect('profile')
    return render(request, 'pixelfy_app/upload.html')


def alt_filename(request):
    pass


# set response options: like, unlike, fail - so jquery can update html/css
def like(request, pk):
    post = get_object_or_404(Pixelfy, pk=pk)
    unlike = Like.objects.filter(user=request.user, post=post).exists()
    if unlike:
        unlike = Like.objects.get(user=request.user, post=post)
        unlike.delete()
    else:
        like = Like(user=request.user, post=post)
        like.save()
    return HttpResponse('Success')
