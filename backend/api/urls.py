from django.urls import path, include 
from . import views
from rest_framework_nested import routers

router = routers.DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'profiles', views.UserProfileViewSet)
# router.register(r'reviews', views.ReviewViewSet)

post_router = routers.NestedDefaultRouter(router, 'posts', lookup='post')
post_router.register('images', views.ImageViewSet, basename='post-images')
# book_router.register('ratings', views.RatingViewSet, basename='book-ratings')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(post_router.urls)),
]