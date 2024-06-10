# Generated by Django 5.0.4 on 2024-06-10 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_remove_panier_state_alter_commande_commande_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='panier',
            name='state',
            field=models.CharField(default='in_panier', max_length=10),
        ),
        migrations.AlterField(
            model_name='commande',
            name='commande_number',
            field=models.CharField(default='WX6mSvgZez', max_length=10),
        ),
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.PositiveIntegerField(default=5),
        ),
    ]
