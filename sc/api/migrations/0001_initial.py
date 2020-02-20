# Generated by Django 3.0 on 2020-02-17 16:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SchoolYear',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.PositiveIntegerField(default=0)),
                ('end', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('section', models.CharField(blank=True, max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student_id', models.CharField(default='None', max_length=20, unique=True)),
                ('image', models.ImageField(blank=True, upload_to='')),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('middle_initial', models.CharField(blank=True, max_length=2)),
                ('email', models.EmailField(max_length=254)),
                ('contact_number', models.CharField(max_length=14)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1)),
                ('age', models.PositiveIntegerField()),
                ('birthday', models.DateField()),
                ('address', models.TextField()),
                ('guardian', models.CharField(default='None', max_length=60)),
            ],
            options={
                'ordering': ['first_name'],
            },
        ),
        migrations.CreateModel(
            name='Year',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='YearSectionDegreeSchool',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('degree', models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, to='users.Degree')),
                ('school', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='users.School')),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Section')),
                ('students', models.ManyToManyField(to='api.Student')),
                ('sy', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.SchoolYear')),
                ('year', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Year')),
            ],
        ),
    ]
