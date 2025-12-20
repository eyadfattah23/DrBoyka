from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Package, Subscription
from .serializers import (
    PackageSerializer, SubscriptionCreateSerializer
)

class PackageViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing packages."""
    queryset = Package.objects.filter(is_active=True)
    serializer_class = PackageSerializer

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionCreateSerializer
    http_method_names = ['post']  # Only allow creation
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        subscription = serializer.save()
        
        return Response({
            'success': True,
            'message': 'Subscription created successfully',
            'whatsapp_sent': subscription.whatsapp_sent,
            'subscription_id': subscription.id
        }, status=status.HTTP_201_CREATED)
