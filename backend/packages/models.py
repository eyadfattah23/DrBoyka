from django.db import models

# Create your models here.


class Package(models.Model):
    name = models.CharField(max_length=255)
    short_description = models.TextField()
    one_month_price_before_discount = models.DecimalField(
        max_digits=10, decimal_places=2)
    one_month_price_after_discount = models.DecimalField(
        max_digits=10, decimal_places=2)
    six_month_price_before_discount = models.DecimalField(
        max_digits=10, decimal_places=2)
    six_month_price_after_discount = models.DecimalField(
        max_digits=10, decimal_places=2)
    twelve_month_price_before_discount = models.DecimalField(
        max_digits=10, decimal_places=2)
    twelve_month_price_after_discount = models.DecimalField(
        max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


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
    is_expired = models.BooleanField(default=True)
    expired_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.package.name} - {self.duration}"
