# Generated by Django 5.0.4 on 2024-05-31 08:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_commande_commande_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='commande',
            name='panier',
        ),
        migrations.AddField(
            model_name='commande',
            name='product',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='api.product'),
        ),
        migrations.AddField(
            model_name='commande',
            name='quantity',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='commande',
            name='commande_number',
            field=models.CharField(default='2t8HKFOzAC', max_length=10),
        ),
    ]
