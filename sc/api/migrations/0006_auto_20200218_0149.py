# Generated by Django 3.0 on 2020-02-17 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20200218_0144'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='age',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='image',
            field=models.ImageField(default='default.jpg', upload_to=''),
        ),
    ]
