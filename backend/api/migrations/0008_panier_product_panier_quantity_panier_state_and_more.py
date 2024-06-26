# Generated by Django 5.0.4 on 2024-05-28 07:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_product_img_product_img_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='panier',
            name='product',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='api.product'),
        ),
        migrations.AddField(
            model_name='panier',
            name='quantity',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='panier',
            name='state',
            field=models.CharField(default='in_panier', max_length=10),
        ),
        migrations.DeleteModel(
            name='PanierItem',
        ),
    ]
