from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.db.models import Count
from django.http import HttpResponse, HttpResponseRedirect
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
        altered = ContentFile(b64decode(altered_b64), name='temp.' + ext)  # You can save this as file instance.
        post = Pixelfy(user=request.user, original_image=original, altered_image=altered)
        post.save()
        return redirect('profile')
    return render(request, 'pixelfy_app/upload.html')


def alt_filename(request):
    pass


def like_post(request):
    post = get_object_or_404(Pixelfy, id=request.POST.get('post_id'))
    is_liked = False
    if post.likes.filter(id=request.user.id).exist():
        post.likes.remove(request.user)
        is_liked = False
    else:
        post.likes.add(request.user)
        is_liked = True
    return HttpResponseRedirect(post.get_absolute_url())
