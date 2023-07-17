from django.shortcuts import render
from django.core.files.storage import default_storage
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, DjangoModelPermissions
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from core.models import Blog, UserProfile, Image, STATUS_PUBLISHED
from .serializers import UserProfileSerializer, BlogSerializer, ImageSerializer
from .permissions import IsOwnerOrAdmin, IsOwner, BlogIsOwner

UNSAFE_METHODS = ('PATCH', 'PUT', 'DELETE')

# Create your views here.
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer 
    
    def get_permissions(self):
        method = self.request.method
        if method in permissions.SAFE_METHODS:
            return [AllowAny()]
        elif method == 'POST':
            return [IsAuthenticated()]
        elif method in ('PATCH', 'PUT', 'DELETE'):
            return [IsOwner()]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if instance.profile_picture:
            file_path = instance.profile_picture.path
            if default_storage.exists(file_path):
                default_storage.delete(file_path)

        return super().destroy(request, *args, **kwargs)

    @action(detail=False, methods=['GET', 'PATCH', 'PUT'], permission_classes=[IsAuthenticated])
    def me(self, request):
        (profile, created) = UserProfile.objects.get_or_create(user_id=request.user.id)

        if request.method in permissions.SAFE_METHODS:
            serializer = UserProfileSerializer(profile)
        else:
            serializer = UserProfileSerializer(profile, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(serializer.data)
    

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().filter(blog_status=STATUS_PUBLISHED).order_by('-created_at')
    serializer_class = BlogSerializer

    @action(detail=False, methods=['GET'], permission_classes=[BlogIsOwner])
    def me(self, request):
        blogs = Blog.objects.filter(author_id=request.user.id)
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        method = self.request.method
        if method in permissions.SAFE_METHODS:
            return [AllowAny()]
        elif method == 'POST':
            return [IsAuthenticated()]
        elif method in ('PATCH', 'PUT', 'DELETE'):
            return [BlogIsOwner()]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save()
        return super().retrieve(request, *args, **kwargs)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
        
    #     if instance.cover_photo:
    #         file_path = instance.cover_photo.path
    #         if default_storage.exists(file_path):
    #             default_storage.delete(file_path)
        
    #     if instance.pdf:
    #         file_path = instance.pdf.path
    #         if default_storage.exists(file_path):
    #             default_storage.delete(file_path)

    #     return super().destroy(request, *args, **kwargs)


class ImageViewSet(viewsets.ModelViewSet):
    serializer_class = ImageSerializer

    def get_queryset(self):
        return Image.objects.filter(blog_id=self.kwargs['blog_pk']).order_by('-created_at')
    
    def get_permissions(self):
        method = self.request.method
        if method in permissions.SAFE_METHODS:
            return [AllowAny()]
        elif method == 'POST':
            return [IsAuthenticated()]
        elif method in UNSAFE_METHODS:
            return [IsOwner()]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'request': self.request})
        context.update({'blog_id': self.kwargs['blog_pk']})
        return context