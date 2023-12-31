from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib import admin
from django.core.validators import FileExtensionValidator, MaxValueValidator, MinValueValidator

# Create your models here.

PROFILE_ADMIN = 'A'
PROFILE_MODERATOR = 'M'
PROFILE_USER = 'U'
PROFILE_CHOICES = {
    (PROFILE_ADMIN, 'Admin'),
    (PROFILE_MODERATOR, 'Moderator'),
    (PROFILE_USER, 'User'),
}

STATUS_PENDING = 'Pending'
STATUS_PUBLISHED = 'Published'
STATUS_REJECTED = 'Rejected'
STATUS_CHOICES = {
    (STATUS_PENDING, STATUS_PENDING),
    (STATUS_PUBLISHED, STATUS_PUBLISHED),
    (STATUS_REJECTED, STATUS_REJECTED),
}


class User(AbstractUser):
    first_name = models.CharField(max_length=100, blank=False, null=False)
    last_name = models.CharField(max_length=100, blank=False, null=False)
    email = models.EmailField(unique=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    profile_picture = models.ImageField(upload_to='profile_pictures', blank=True, null=True)
    phone = models.CharField(max_length=12)
    profile_type = models.CharField(
        max_length=1, choices=PROFILE_CHOICES, default=PROFILE_USER
    )

    def __str__(self) -> str:
        return f'{self.user.first_name} {self.user.last_name}'
    
    @admin.display(ordering='user__first_name')
    def first_name(self):
        return self.user.first_name
    
    @admin.display(ordering='user__last_name')
    def last_name(self):
        return self.user.last_name
    
    class Meta:
        ordering = ['user__first_name', 'user__last_name']


class Blog(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    views = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    blog_status = models.CharField(
        max_length=9, choices=STATUS_CHOICES, default=STATUS_PENDING
    )

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogs')

    def __str__(self) -> str:
        return self.title


class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='images')
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='images')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='images', null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.user.first_name} {self.user.last_name} - {self.image}'


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='ratings')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    rating = models.IntegerField(blank=False, null=False, validators=[
        MaxValueValidator(5),
        MinValueValidator(1)
    ])

    class Meta:
        unique_together = ('user', 'blog')

    def __str__(self) -> str:
        return f'{self.user.first_name} {self.user.last_name} - Rate: {self.rating}'
    