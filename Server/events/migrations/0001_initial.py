# Generated by Django 5.1 on 2024-08-25 12:16

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('image_src', models.URLField()),
                ('event_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('start_datetime', models.DateTimeField()),
                ('end_datetime', models.DateTimeField()),
                ('location', models.CharField(max_length=255)),
                ('capacity', models.IntegerField(default=0)),
                ('description', models.TextField(blank=True, null=True)),
                ('interests', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, null=True, size=None)),
                ('required_skills', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, null=True, size=None)),
                ('gender', models.CharField(blank=True, max_length=100, null=True)),
                ('language', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, null=True, size=None)),
                ('learning_materials', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=255), blank=True, null=True, size=None)),
            ],
        ),
    ]
