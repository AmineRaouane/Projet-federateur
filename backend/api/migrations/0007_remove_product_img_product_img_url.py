# Generated by Django 5.0.4 on 2024-05-27 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_panier_items_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='img',
        ),
        migrations.AddField(
            model_name='product',
            name='img_url',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]