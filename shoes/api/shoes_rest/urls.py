from django.urls import path

from .views import list_bins, list_shoes, delete_shoe

urlpatterns = [
    path("bins/", list_bins, name="list_bins"),
    path("shoes/", list_shoes, name="list_shoes"),
    path("shoes/<int:id>/", delete_shoe, name="delete_shoe"),
]
