from django.urls import path
from .views import UserCreate, UserProfileImageUploadView

urlpatterns = [
    path('user-register/', UserCreate.as_view()),
    path('user-upload-profile-image/', UserProfileImageUploadView.as_view()),
]
