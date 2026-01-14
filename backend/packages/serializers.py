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
    def validate(self, data):
        """Validate subscription data"""
        package = data.get('package')
        duration = data.get('duration')
        whatsapp_phone_number = data.get('whatsapp_phone_number')
        
        # Check if package is active
        if not package.is_active:
            raise serializers.ValidationError({
                'package': 'Selected package is not currently available.'
            })
        
        # Check if duration is valid for this package
        if duration not in dict(Subscription.DURATION_CHOICES):
            raise serializers.ValidationError({
                'duration': 'Invalid subscription duration selected.'
            })
            
        existing_count = Subscription.objects.filter(
            whatsapp_phone_number=whatsapp_phone_number,
            package=package,
            duration=duration,
            status__in=['pending_payment', 'active']
        ).count()
        
        if existing_count >= 3:
            raise serializers.ValidationError({
                'whatsapp_phone_number_duplication': 'This phone number already has 3 active or pending subscriptions for this package and duration. Please contact support.'
            })
        
        return data
        
    def create(self, validated_data):
        # Get pricing from package
        package = validated_data['package']
        duration = validated_data['duration']
        pricing = package.get_price(duration)
        
        validated_data['price_before_discount'] = pricing.get('before', 0)
        validated_data['price_after_discount'] = pricing.get('after', 0)
        
        return super().create(validated_data)
