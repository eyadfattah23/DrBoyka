from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PackageViewSet, SubscriptionViewSet

router = DefaultRouter()
router.register('packages', PackageViewSet)
router.register('subscriptions', SubscriptionViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
