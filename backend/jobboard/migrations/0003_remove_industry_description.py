# Generated by Django 2.2.4 on 2019-08-23 14:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobboard', '0002_auto_20190823_1026'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='industry',
            name='description',
        ),
    ]
