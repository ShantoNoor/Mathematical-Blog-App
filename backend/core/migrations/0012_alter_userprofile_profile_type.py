# Generated by Django 3.2.19 on 2023-07-18 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_auto_20230718_1417'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_type',
            field=models.CharField(choices=[('M', 'Moderator'), ('U', 'User'), ('A', 'Admin')], default='U', max_length=1),
        ),
    ]
