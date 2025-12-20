from django.db import models

from django.core.exceptions import ValidationError

def validate_image_size(image):
    """Limit image size to 5MB"""
    max_size_mb = 5
    if image.size > max_size_mb * 1024 * 1024:
        raise ValidationError(f'Image size must be less than {max_size_mb}MB. Current size: {image.size / (1024*1024):.1f}MB')

def validate_image_dimensions(image):
    """Validate image dimensions"""
    from PIL import Image
    img = Image.open(image)
    width, height = img.size
    
    max_dimension = 4000  # 4000px max width or height
    
    if width > max_dimension or height > max_dimension:
        raise ValidationError(
            f'Image dimensions too large. Maximum {max_dimension}x{max_dimension}px. '
            f'Your image: {width}x{height}px'
        )
 
# Create your models here.

class Transformation(models.Model):
    name = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    before_image = models.ImageField(
        upload_to='transformations/before/',
        validators=[validate_image_size, validate_image_dimensions],
        help_text='Maximum 5MB, recommended size 1200x1200px'
    )
    after_image = models.ImageField(
        upload_to='transformations/after/',
        validators=[validate_image_size, validate_image_dimensions],
        help_text='Maximum 5MB, recommended size 1200x1200px'
    )
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.name} - {self.duration}"
