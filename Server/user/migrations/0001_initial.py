# Generated by Django 5.1 on 2024-08-24 06:51

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('admin_code', models.CharField(max_length=100, null=True)),
                ('age', models.IntegerField(null=True)),
                ('email', models.EmailField(max_length=100)),
                ('ethnicity', models.CharField(max_length=100, null=True)),
                ('gender', models.CharField(max_length=100, null=True)),
                ('interests', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, null=True, size=5)),
                ('user_type', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('residence', models.CharField(max_length=100, null=True)),
                ('username', models.CharField(max_length=100)),
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
    ]
