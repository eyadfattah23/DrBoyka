from django.contrib import admin
from .models import *
from users.models import Transformation
from django.utils.html import format_html
# Register your models here.

@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('is_active', 'created_at')
    ordering = ('-created_at',)
@admin.register(PackageDescription)
class PackageDescriptionAdmin(admin.ModelAdmin):
    list_display = ('description', 'package')
    search_fields = ('description',)
    list_filter = ('package',)
@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('fullname', 'package__name', 'price_after_discount','duration', 'status', "activated_at","whatsapp_phone_number", "calls_phone_number", "created_at", "expires_at")
    list_editable =  ('status', "activated_at", "expires_at", 'price_after_discount')
    exclude = ("email", "updated_at", "whatsapp_sent", "whatsapp_sent_at", "whatsapp_message_sid", "whatsapp_error", "price_before_discount", "price_after_discount")
    search_fields = ('fullname', 'package__name', 'whatsapp_phone_number', 'calls_phone_number')
    list_filter = ('duration', 'package__name', 'status' )
    ordering = ('-created_at',)

@admin.register(Transformation)
class TransformationAdmin(admin.ModelAdmin):
    list_display = ["name", "duration", "is_active", "order", "created_at", "before_image_tag", "after_image_tag"]
    list_editable = ['is_active', 'order']
    
    def before_image_tag(self, obj):
        if obj.before_image:
            return format_html(
                '<img src="{}" style="max-width:200px; max-height:200px; object-fit:cover;"/>',
                obj.before_image.url
            )
        return format_html('<span style="color: #999;">No image</span>')
    
    def after_image_tag(self, obj):
        if obj.after_image:
            return format_html(
                '<img src="{}" style="max-width:200px; max-height:200px; object-fit:cover;"/>',
                obj.after_image.url
            )
        return format_html('<span style="color: #999;">No image</span>')

    before_image_tag.short_description = 'Before Image'
    after_image_tag.short_description = 'After Image'
