from rest_framework import serializers
from core.models import Blog, Rating, STATUS_CHOICES, UserProfile, Image, STATUS_PENDING
from core.serializers import UserSerializer

class RatingSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    blog_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Rating
        fields = ['id', 'user_id', 'blog_id', 'rating', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        blog_id = self.context['blog_id']
        user_id = self.context['request'].user.id
        return Rating.objects.create(blog_id=blog_id, user_id=user_id, **validated_data)


class ImageSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    blog_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Image
        fields = ['id', 'user_id', 'blog_id', 'image', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        blog_id = self.context['blog_id']
        user_id = self.context['request'].user.id
        return Image.objects.create(blog_id=blog_id, user_id=user_id, **validated_data)


class BlogSerializer(serializers.ModelSerializer):
    blog_status = serializers.ChoiceField(choices=STATUS_CHOICES, default=STATUS_PENDING)
    views = serializers.IntegerField(read_only=True)
    ratings = RatingSerializer(many=True, read_only=True)
    rating = serializers.SerializerMethodField(method_name='get_rating')
    author = UserSerializer(read_only=True)

    images = ImageSerializer(many=True, read_only=True)

    uploaded_images = serializers.ListField(
        child=serializers.ImageField(use_url=True, allow_empty_file=True),
        write_only=True, required=False, allow_null=True, default=[]
    )

    def get_rating(self, blog):
        qs = Rating.objects.all().filter(blog_id=blog.id)
        total_rating = 0
        count_user = 0
        for rating in qs:
            total_rating += rating.rating
            count_user += 1

        if count_user == 0:
            return 0.0
        return total_rating / count_user
        
    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images')

        author = self.context['request'].user
        blog = Blog.objects.create(author=author, **validated_data)

        for image in uploaded_images:
            Image.objects.create(user=author, blog=blog, image=image)
        
        return blog
    
    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', None)

        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.blog_status = validated_data.get('blog_status', instance.blog_status)
        instance.save()

        if uploaded_images:
            # Create new images for the instance
            for image in uploaded_images:
                Image.objects.create(user=instance.author, blog=instance, image=image)

        return instance

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'views', 'created_at', 'updated_at', 'blog_status', 'author', 'images', 'uploaded_images', 'rating', 'ratings']


class UserProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = UserProfile
        fields = ['id', 'user_id', 'profile_picture', 'phone']

    def create(self, validated_data):
        user = self.context['request'].user
        return UserProfile.objects.create(user=user, **validated_data)


