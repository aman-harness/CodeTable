# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-10 07:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Code',
            fields=[
                ('code_id', models.CharField(max_length=11, primary_key=True, serialize=False, unique=True)),
                ('last_edited', models.DateTimeField()),
                ('code_actual', models.CharField(max_length=50000)),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code_id', models.CharField(max_length=11)),
                ('allowed_list', models.CharField(max_length=500)),
            ],
        ),
    ]
