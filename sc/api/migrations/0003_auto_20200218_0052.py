# Generated by Django 3.0 on 2020-02-17 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20200218_0051'),
    ]

    operations = [
        migrations.AlterField(
            model_name='yearsectiondegreeschool',
            name='students',
            field=models.ManyToManyField(blank=True, to='api.Student'),
        ),
    ]
