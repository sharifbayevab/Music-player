# Generated by Django 4.2.7 on 2023-11-21 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playlists', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='track',
            name='rating',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True),
        ),
    ]
