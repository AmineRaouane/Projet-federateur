from django.db import models 
from django.utils import timezone
from django.contrib.auth.models import User 
from django.utils.crypto import get_random_string

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(null=True, blank=True)
    img_url = models.CharField(max_length=200, null=True, blank=True)
    categorie = models.CharField(max_length=100)

class Partners(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    Location_url = models.CharField(max_length=200, null=True, blank=True)

class Panier(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    product = models.ForeignKey(Product, on_delete=models.CASCADE,default=None)
    quantity = models.PositiveIntegerField(default=1) 
    state = models.CharField(max_length=10, default='in_panier')

class CommandeManager(models.Manager):
    def custom_method(self):
        pass
class Commande(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    commande_number = models.CharField(max_length=10, default=get_random_string(length=10))
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0) # type: ignore
    name = models.CharField(max_length=100, default='unknown')
    date = models.DateTimeField(default=timezone.now)
    location = models.CharField(max_length=255, default='unknown')
    phone_number = models.CharField(max_length=20, default='unknown')
    product = models.ForeignKey(Product, on_delete=models.CASCADE,default=None)
    quantity = models.PositiveIntegerField(default=1) 
    objects = CommandeManager()

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,default=None)
    phone_number = models.CharField(max_length=20, default='unknown')
    location = models.CharField(max_length=255, default='unknown')
    firstname = models.CharField(max_length=20, default='unknown')
    lastname = models.CharField(max_length=20, default='unknown')
    age = models.PositiveIntegerField(default=0)
    job = models.CharField(max_length=20, default='unknown')
    avatar = models.PositiveIntegerField(default=0)

class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    date = models.DateTimeField(default=timezone.now)
    subscription_type = models.CharField(max_length=20, default='Free')
    subscription_price = models.DecimalField(max_digits=10, decimal_places=2, default=0) # type: ignore