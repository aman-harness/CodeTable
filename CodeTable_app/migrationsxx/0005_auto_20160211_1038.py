# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-11 10:38
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('CodeTable_app', '0004_auto_20160210_2339'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='code',
            name='code_lang',
        ),
        migrations.RemoveField(
            model_name='code',
            name='run_count',
        ),
    ]
