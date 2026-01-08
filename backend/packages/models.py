from django.db import models

# Create your models here.


class Package(models.Model):
    name = models.CharField(max_length=255, unique=True)
    short_description = models.TextField()
    one_month_price_before_discount = models.DecimalField(verbose_name="1 Month Price Before Discount",
                                                          max_digits=10, decimal_places=2)

    one_month_price_after_discount = models.DecimalField(verbose_name="1 Month Price After Discount",
                                                         max_digits=10, decimal_places=2)

    six_month_price_before_discount = models.DecimalField(verbose_name="6 Months Price Before Discount",
                                                          max_digits=10, decimal_places=2)
    six_month_price_after_discount = models.DecimalField(verbose_name="6 Months Price After Discount",
                                                         max_digits=10, decimal_places=2)
    twelve_month_price_before_discount = models.DecimalField(verbose_name="12 Months Price Before Discount",
                                                             max_digits=10, decimal_places=2)
    twelve_month_price_after_discount = models.DecimalField(verbose_name="12 Months Price After Discount",
                                                            max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_special = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    def get_price(self, duration):
        """Get pricing based on duration"""
        if duration == '1_month':
            return {
                'before': self.one_month_price_before_discount,
                'after': self.one_month_price_after_discount
            }
        elif duration == '6_months':
            return {
                'before': self.six_month_price_before_discount,
                'after': self.six_month_price_after_discount
            }
        elif duration == '12_months':
            return {
                'before': self.twelve_month_price_before_discount,
                'after': self.twelve_month_price_after_discount
            }
        return {'before': 0, 'after': 0}


class PackageDescription(models.Model):
    description = models.TextField()
    package = models.ForeignKey(
        Package, related_name='descriptions', on_delete=models.CASCADE)

    def __str__(self):
        return self.description


class Subscription(models.Model):
    DURATION_CHOICES = [
        ('1_month', '1 Month'),
        ('6_months', '6 Months'),
        ('12_months', '12 Months'),
    ]
    STATUS_CHOICES = [
        ('pending_payment', 'Pending Payment'),
        ('payment_received', 'Payment Received'),
        ('active', 'Active'),
        ('expired', 'Expired'),
        ('cancelled', 'Cancelled'),
    ]
    package = models.ForeignKey(
        Package, related_name='subscriptions', on_delete=models.PROTECT)
    duration = models.CharField(
        max_length=20, choices=DURATION_CHOICES)
    price_before_discount = models.DecimalField(
        max_digits=10, decimal_places=2)
    price_after_discount = models.DecimalField(
        max_digits=10, decimal_places=2)

    fullname = models.CharField(max_length=255)
    whatsapp_phone_number = models.CharField(max_length=20)
    calls_phone_number = models.CharField(max_length=20)
    email = models.EmailField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    activated_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='pending_payment')

    whatsapp_sent = models.BooleanField(default=False)
    whatsapp_sent_at = models.DateTimeField(null=True, blank=True)
    whatsapp_message_sid = models.CharField(max_length=100, blank=True)
    whatsapp_error = models.TextField(blank=True)


    notes = models.TextField(blank=True, help_text="Coach notes")

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.fullname} - {self.package.name} ({self.get_status_display()})"

    def clean(self):
        """Validate if the user can subscribe to the selected package and duration"""
        from django.core.exceptions import ValidationError

        if not self.package.is_active:
            raise ValidationError("Selected package is not active.")

        if self.duration not in dict(self.DURATION_CHOICES):
            raise ValidationError("Invalid duration selected.")
        existing_subscriptions = Subscription.objects.filter(
            whatsapp_phone_number=self.whatsapp_phone_number,
            package=self.package,
            duration=self.duration,
            status__in=['pending_payment', 'active']
        ).exclude(pk=self.pk).count()
        if existing_subscriptions > 3:
            raise ValidationError(
                "This whatsapp phone number already has an +3 active or pending subscription for this package and duration."
            )
            
    def save(self, *args, **kwargs):
            if not self.price_before_discount or not self.price_after_discount:
                pricing = self.get_price()
                self.price_before_discount = pricing['before']
                self.price_after_discount = pricing['after']
            self.full_clean()
            super().save(*args, **kwargs)
            
    """ def save(self, *args, **kwargs):
        # Auto-send WhatsApp on creation
        is_new = self.pk is None
        
        super().save(*args, **kwargs)
        if is_new and not self.whatsapp_sent:
            self.send_payment_instructions() """

    def get_price(self):
        """Get pricing based on duration"""
        if self.duration == '1_month':
            return {
                'before': self.package.one_month_price_before_discount,
                'after': self.package.one_month_price_after_discount
            }
        elif self.duration == '6_months':
            return {
                'before': self.package.six_month_price_before_discount,
                'after': self.package.six_month_price_after_discount
            }
        elif self.duration == '12_months':
            return {
                'before': self.package.twelve_month_price_before_discount,
                'after': self.package.twelve_month_price_after_discount
            }
        return {'before': 0, 'after': 0}

    def send_payment_instructions(self):
        """Send WhatsApp message with payment instructions"""
        from .utils.whatsapp import send_whatsapp_message, get_subscription_message
        from django.utils import timezone

        message = get_subscription_message(self)
        success, result = send_whatsapp_message(
            self.whatsapp_phone_number,
            message
        )

        self.whatsapp_sent = success
        self.whatsapp_sent_at = timezone.now() if success else None

        if success:
            self.whatsapp_message_sid = result
        else:
            self.whatsapp_error = result

        self.save(update_fields=[
            'whatsapp_sent', 'whatsapp_sent_at',
            'whatsapp_message_sid', 'whatsapp_error'
        ])
