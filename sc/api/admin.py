from django.contrib import admin
from .models import *
# Register your models here.


class StudentAdmin(admin.ModelAdmin):
    search_fields = ('first_name', 'last_name', 'student_id', 'middle_initial')
    list_display = ('__str__', 'first_name', 'last_name', 'middle_initial', 'student_id', 'gender')
    list_filter = ('gender', )
    list_per_page = 10

class BatchAdmin(admin.ModelAdmin):
    search_fields = ('school__name', 'school__name_short', 'degree__title', 'degree__short', 'year__year', 'section__section', 'sy__start', 'sy__end')
    list_display = ('__str__', 'school', 'degree', 'year', 'section', 'sy')
    list_filter = ('school', 'degree', 'year', 'section', 'sy')
    list_per_page = 10


admin.site.register(Student, StudentAdmin)
admin.site.register(SchoolYear)
admin.site.register(Year)
admin.site.register(Section)
admin.site.register(YearSectionDegreeSchool, BatchAdmin)