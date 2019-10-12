from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.db.models import Count
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core.files.base import ContentFile
from django.template.loader import render_to_string
from base64 import b64decode
from .models import *
from datetime import *


# Create your views here.
def index(request):
    feed = Pixelfy.objects.all().order_by('-created_date')
    liked = [post for post in feed if post.likes.filter(id=request.user.id).exists()]
    return render(request, 'pixelfy_app/index.html', {'posts': feed, 'liked': liked})


def index_user(request, user):
    feed = Pixelfy.objects.filter(user__username=user).order_by('-created_date')
    liked = [post for post in feed if post.likes.filter(id=request.user.id).exists()]
    return render(request, 'pixelfy_app/index.html', {'posts': feed, 'liked': liked})


def index_best(request):
    feed = Pixelfy.objects.annotate(like_count=Count('likes')).order_by('-like_count')
    liked = [post for post in feed if post.likes.filter(id=request.user.id).exists()]
    return render(request, 'pixelfy_app/index.html', {'posts': feed, 'liked': liked})


def index_year(request):
    current = datetime.now()
    last_year = current - timedelta(days=365)
    feed = Pixelfy.objects.filter(created_date__gte=last_year).order_by('-created_date')
    liked = [post for post in feed if post.likes.filter(id=request.user.id).exists()]
    return render(request, 'pixelfy_app/index.html', {'posts': feed, 'liked': liked})


def index_month(request):
    current = datetime.now()
    last_month = current - timedelta(days=30)
    feed = Pixelfy.objects.filter(created_date__gte=last_month).order_by('-created_date')
    liked = [post for post in feed if post.likes.filter(id=request.user.id).exists()]
    return render(request, 'pixelfy_app/index.html', {'posts': feed, 'liked': liked})


def index_week(request):
    current = datetime.now()
    last_week = current - timedelta(days=7)
    feed = Pixelfy.objects.filter(created_date__gte=last_week).order_by('-created_date')
    liked = [post for post in feed if post.likes.filter(id=request.user.id).exists()]
    return render(request, 'pixelfy_app/index.html', {'posts': feed, 'liked': liked})


def index_day(request):
    current = datetime.now()
    last_day = current - timedelta(days=1)
    feed = Pixelfy.objects.filter(created_date__gte=last_day).order_by('-created_date')
    liked = [post for post in feed if post.likes.filter(id=request.user.id).exists()]
    return render(request, 'pixelfy_app/index.html', {'posts': feed, 'liked': liked})


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
    post = get_object_or_404(Pixelfy, id=request.POST.get('id'))
    is_liked = False
    if post.likes.filter(id=request.user.id).exists():
        post.likes.remove(request.user)
        is_liked = False
    else:
        post.likes.add(request.user)
        is_liked = True
    context = {
        'post': post,
        'is_liked': is_liked,
        'total_likes': post.total_likes(),
    }
    if request.is_ajax():
        html = render_to_string('pixelfy:like_section.html', context, request=request)
        return JsonResponse({'form': html})
