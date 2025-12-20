from .serializers import TransformationSerializer
from rest_framework import viewsets
from .models import Transformation
# Create your views here.

class TransformationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Transformation.objects.filter(is_active=True)
    serializer_class = TransformationSerializer
