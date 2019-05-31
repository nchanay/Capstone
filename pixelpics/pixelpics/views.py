from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import render, redirect, get_object_or_404
from pixelfy_app.models import *


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            username = user.username
            password = request.POST['password1']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('pixelfy:index')  # TODO redirect to profile?

    form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})


@login_required
def profile(request):
    gallery = Pixelfy.objects.filter(user=request.user).order_by('-created_date')
    return render(request, 'registration/profile.html', {'gallery': gallery})


@login_required
def delete_post(request, pk):
    post = get_object_or_404(Pixelfy, pk=pk, user=request.user)
    post.delete()
    return redirect('profile')
