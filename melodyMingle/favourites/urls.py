from django.urls import path
from .views import FavouriteList, FavouriteDetail, FavouriteToggle, IsFavourite

urlpatterns = [
    path('favourites-list/', FavouriteList.as_view(), name='favourites-list'),
    path('toggle/', FavouriteToggle.as_view(), name='favourite-toggle'),
    path('check/<int:track_id>/', IsFavourite.as_view(), name='is-favourite'),
    path('favourites-list/<int:pk>/', FavouriteDetail.as_view(), name='favourite-detail'),
]