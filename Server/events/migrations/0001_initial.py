# Generated by Django 5.1 on 2024-08-24 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0003_rename_interest_user_interests_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_src', models.URLField()),
                ('title', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('location', models.CharField(max_length=255)),
                ('eventid', models.CharField(max_length=255, unique=True)),
                ('registered_users', models.ManyToManyField(related_name='events', to='user.user')),
            ],
        ),
    ]