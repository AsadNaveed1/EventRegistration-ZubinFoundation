# Generated by Django 5.1 on 2024-08-24 22:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_remove_event_registered_users'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='eventid',
        ),
    ]
