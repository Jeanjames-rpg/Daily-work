from django.db import models

# Create your models here.
class Contact_details(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    phno=models.CharField(max_length=15)
    password=models.CharField(max_length=10)
    location=models.CharField(max_length=100)
    class Meta:
        db_table='contact_details'
