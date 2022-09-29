from django.db import models

# Create your models here.

class React(models.Model):
    name = models.CharField(max_length=30)
    detail = models.CharField(max_length=500)

'''
class Vehicle(models.Model):
    name =
    brand =
    model =
    plate =
    year =
    VIN =
'''