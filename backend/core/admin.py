from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from core.models import (User, UserProfile, Comment, Like, Image, Rating, Post,
    PROFILE_ADMIN, PROFILE_MODERATOR, PROFILE_USER, STATUS_PUBLISHED, STATUS_PENDING, STATUS_REJECTED)
from django.contrib.auth.models import Group

# Register your models here.
GROUP_MODERATOR = Group.objects.get_or_create(name='Moderator')

admin.site.register(Rating)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Image)

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('first_name', 'last_name', 'username', 'email', 'password1', 'password2'),
        }),
    )

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone', 'birth_date', 'profile_type']
    list_editable = ['profile_type']
    list_per_page = 10
    ordering = ['user']

    def save_form(self, request, form, change):
        form_data = form.cleaned_data
        
        user = None
        if form_data.get('user'):
            user = form_data.get('user') # getting user
        elif form_data.get('id'):
            user = User.objects.all().filter(profile=form_data.get('id')).first()

        if user and form_data.get('profile_type') == PROFILE_ADMIN:
            user.is_superuser = True
        else:
            user.is_superuser = False

        if user and form_data.get('profile_type') == PROFILE_USER:
            user.is_staff = False
        else:
            user.is_staff = True

        if user and form_data.get('profile_type') == PROFILE_MODERATOR:
            GROUP_MODERATOR.user_set.add(user)
        else:
            GROUP_MODERATOR.user_set.remove(user)

        if user: 
            user.save()

        return super().save_form(request, form, change)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'added_by', 'post_status']
    list_editable = ['post_status']
    list_per_page = 10
    ordering = ['title']

    # def get_queryset(self, request: HttpRequest) -> QuerySet[Any]:
    #     qs1 = Post.objects.filter(post_status=STATUS_PENDING).all().order_by('-created_at')
    #     qs2 = Post.objects.filter(post_status=STATUS_PUBLISHED).all().order_by('-created_at')
    #     qs3 = Post.objects.filter(post_status=STATUS_REJECTED).all().order_by('-created_at')
    #     # qs = qs1.union(qs2)
    #     return qs1 | qs2 |qs3