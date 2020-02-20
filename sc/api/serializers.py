from rest_framework import serializers

from .models import *
from users.models import Degree


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['student_id', 'first_name', 'last_name', 'middle_initial', 'gender', 'email', 'contact_number']

class StudentRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class BatchListSerializer(serializers.ModelSerializer):
    school = serializers.CharField(source='school.name')
    school_short = serializers.CharField(source='school.name_short')
    degrees = serializers.CharField(source='degree.title')
    degree_short = serializers.CharField(source='degree.short')
    year = serializers.CharField(source='year.year')
    section = serializers.CharField(source='section.section')
    sy = serializers.CharField(source='sy.__str__')

    class Meta:
        fields = ['id', 'school', 'school_short', 'degrees', 'degree_short', 'year', 'section', 'sy']
        model = YearSectionDegreeSchool

class BatchRetrieveSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True)
    school = serializers.CharField(source='school.name')
    degree = serializers.CharField(source='degree.title')
    year = serializers.CharField(source='year.year')
    section = serializers.CharField(source='section.section')
    sy_s = serializers.CharField(source='sy.start')
    sy_e = serializers.CharField(source='sy.end') 

    class Meta:
        fields = ['students', 'school', 'degree', 'year', 'section', 'sy_s', 'sy_e']
        model = YearSectionDegreeSchool

class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Degree
        fields = ['title']

class SchoolYearSerializer(serializers.ModelSerializer):
    sy = serializers.CharField(source='__str__')
    class Meta:
        model =SchoolYear
        fields = ['sy']
    
class SchoolSerializer(serializers.ModelSerializer):
    degrees = DegreeSerializer(many=True)
    class Meta:
        model = School
        fields = ['degrees']