from django.contrib import admin
from . import models

admin.site.register(models.Product)
admin.site.register(models.Panier)
admin.site.register(models.Commande)
admin.site.register(models.Partners)
admin.site.register(models.Profile)
admin.site.register(models.Subscription)

