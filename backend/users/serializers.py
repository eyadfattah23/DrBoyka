from rest_framework import serializers
from .models import Transformation
class TransformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transformation
        fields = ['id', 'name', 'duration', 'before_image', 'after_image']
