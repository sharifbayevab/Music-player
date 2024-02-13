from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    profile_image = serializers.ImageField(required=False)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'profile_image']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
