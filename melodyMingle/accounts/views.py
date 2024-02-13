from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .serializers import UserSerializer
from rest_framework.generics import RetrieveUpdateAPIView
from .models import CustomUser

class UserCreate(APIView):

    parser_classes = [JSONParser, MultiPartParser, FormParser]
    # parser_classes = [JSONParser]
    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        else:
            return Response({"detail": "Unauthenticated user"}, status=status.HTTP_403_FORBIDDEN)

    def post(self, request, format=None, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        request.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserUpdateView(RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class UserProfileImageUploadView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def put(self, request, format=None):
        user = request.user
        file = request.FILES.get('file')
        if file:
            user.profile_image = file
            user.save()
            return Response(UserSerializer(user).data)
        else:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
