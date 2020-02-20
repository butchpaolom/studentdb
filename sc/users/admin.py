from django.contrib import admin
from .models import Profile, School, Degree
# Register your models here.

class SchoolAdmin(admin.ModelAdmin):
    search_fields = ('name', 'name_short')
    list_display = ('name', 'name_short')

class DegreeAdmin(admin.ModelAdmin):
    search_fields = ('title', 'short')
    list_display = ('title', 'short')

class ProfileAdmin(admin.ModelAdmin):
    search_fields = ('user__username', 'user__first_name', 'user__last_name')
    list_display = ('user', 'first_name', 'last_name','school', 'admin')

    def first_name(self, obj):
        return obj.user.first_name

    def last_name(self, obj):
        return obj.user.last_name

    first_name.short_description = 'First Name'
    first_name.admin_order_field = 'user__first_name'
    last_name.short_description = 'Last Name'
    last_name.admin_order_field = 'user__last_name'


admin.site.register(Profile, ProfileAdmin)
admin.site.register(School, SchoolAdmin)
admin.site.register(Degree, DegreeAdmin)
admin.site.site_header = "Student Central DB"
admin.site.site_title = "Student Central DB"
admin.site.index_title = "Student Central DB"