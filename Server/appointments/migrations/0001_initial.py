# Generated by Django 5.1 on 2024-08-25 10:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=100)),
                ('time', models.CharField(max_length=50)),
                ('details', models.TextField()),
                ('is_booked', models.BooleanField(default=False)),
            ],
        ),
    ]
