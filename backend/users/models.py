from django.db import models


# Create your models here.
class Transformation(models.Model):
    name = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    before_image = models.ImageField(upload_to='before_images/')
    after_image = models.ImageField(upload_to='after_images/')

    def __str__(self):
        return self.name
