from rest_framework import serializers
from .models import Package, Subscription

class PackageSerializer(serializers.ModelSerializer):
    descriptions = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = Package
        fields = '__all__'

class SubscriptionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['package', 'duration', 'fullname', 
                  'whatsapp_phone_number', 'calls_phone_number', 'email']
    
    def create(self, validated_data):
        # Get pricing from package
        package = validated_data['package']
        duration = validated_data['duration']
        pricing = package.get_price(duration)
        
        validated_data['price_before_discount'] = pricing.get('before', 0)
        validated_data['price_after_discount'] = pricing.get('after', 0)
        
        return super().create(validated_data)
