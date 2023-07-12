from rest_framework import serializers
from core.models import Post, Rating, STATUS_CHOICES, UserProfile, Image
from core.serializers import UserSerializer

class ImageSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    post_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Image
        fields = ['id', 'user_id', 'post_id', 'image', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        post_id = self.context['post_id']
        user_id = self.context['request'].user.id
        return Image.objects.create(post_id=post_id, user_id=user_id, **validated_data)


class PostSerializer(serializers.ModelSerializer):
    post_status = serializers.ChoiceField(choices=STATUS_CHOICES, read_only=True)
    views = serializers.IntegerField(read_only=True)
    # reviews = ReviewSerializer(many=True, read_only=True)
    # ratings = RatingSerializer(many=True, read_only=True)
    # rating = serializers.SerializerMethodField(method_name='get_rating')
    added_by = UserSerializer(read_only=True)

    images = ImageSerializer(many=True, read_only=True)

    uploaded_images = serializers.ListField(
        child=serializers.ImageField(use_url=True, allow_empty_file=True),
        write_only=True
    )

    # def get_rating(self, post):
    #     qs = Rating.objects.all().filter(post_id=post.id)
    #     total_rating = 0
    #     count_user = 0
    #     for rating in qs:
    #         total_rating += rating.rating
    #         count_user += 1

    #     if count_user == 0:
    #         return 0.0
    #     return total_rating / count_user
        
    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images')

        added_by = self.context['request'].user
        post = Post.objects.create(added_by=added_by, **validated_data)

        for image in uploaded_images:
            Image.objects.create(user=added_by, post=post, image=image)
        
        return post


    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'views', 'created_at', 'updated_at', 'post_status', 'added_by', 'images', 'uploaded_images']
        # fields = ('id', 'field1', 'field2')
        # exclude = ('field3',)


class UserProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = UserProfile
        fields = ['id', 'user_id', 'profile_picture', 'phone', 'birth_date']



