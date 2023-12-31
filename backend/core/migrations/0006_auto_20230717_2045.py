# Generated by Django 3.2.19 on 2023-07-17 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_auto_20230717_1449'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='birth_date',
        ),
        migrations.AlterField(
            model_name='blog',
            name='blog_status',
            field=models.CharField(choices=[('Published', 'Published'), ('Rejected', 'Rejected'), ('Pending', 'Pending')], default='Published', max_length=9),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='profile_type',
            field=models.CharField(choices=[('M', 'Moderator'), ('A', 'Admin'), ('U', 'User')], default='U', max_length=1),
        ),
    ]
