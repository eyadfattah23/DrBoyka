from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransformationViewSet
router = DefaultRouter()
router.register('transformations', TransformationViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
