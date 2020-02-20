from django.db import models
from users.models import School, Degree
# Create your models here.


class SchoolYear(models.Model):
    start = models.PositiveIntegerField(default=0, blank=False)
    end = models.PositiveIntegerField(default=0, blank=False)

    def __str__(self):
        return f"{self.start} - {self.end}"

    def save(self, *args, **kwargs):
        self.end = int(self.start) + 1

        super(SchoolYear, self).save(*args, **kwargs)

class Section(models.Model):
    section = models.CharField(max_length=5, blank=True)
    
    def __str__(self):
        return str(self.section)

class Year(models.Model):
    year = models.PositiveIntegerField(blank=False)

    def __str__(self):
        return str(self.year)

class Student(models.Model):
    gender = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    student_id = models.CharField(max_length=20, default='None', unique=True)
    image = models.ImageField(default='default.jpg')
    first_name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=30, blank=False)
    middle_initial = models.CharField(max_length=2, blank=True)
    email = models.EmailField(blank=False)
    contact_number = models.CharField(max_length=14)
    gender = models.CharField(choices=gender, blank=False, max_length=1)
    age = models.PositiveIntegerField(blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    address= models.TextField(default='None')
    guardian = models.CharField(default='None', max_length=60)

    class Meta:
        ordering = ['first_name']

    def __str__(self):
        if self.middle_initial:
            return f"{self.first_name} {self.middle_initial}. {self.last_name}"
        else:
            return f"{self.first_name} {self.last_name}"

    def save(self, *args, **kwargs):
        self.first_name = self.first_name.capitalize()
        self.last_name = self.last_name.capitalize()
        self.middle_initial = self.middle_initial.capitalize()
        self.contact_number = f"0{int(self.contact_number)}"
        self.student_id = self.student_id.upper()

        super(Student, self).save(*args, **kwargs)

class YearSectionDegreeSchool(models.Model):
    school = models.ForeignKey(School, on_delete=models.DO_NOTHING)
    degree = models.ForeignKey(Degree, on_delete=models.DO_NOTHING, default=None)
    students = models.ManyToManyField(Student, blank=True)
    year = models.ForeignKey(Year, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    sy = models.ForeignKey(SchoolYear, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"{self.school.name_short} - {self.degree.short} {self.year}-{self.section} (S.Y {self.sy})"

    class Meta:
        verbose_name = 'Batch'
        verbose_name_plural = 'Batches'
        unique_together = ('school', 'degree', 'section', 'year', 'sy')
    
