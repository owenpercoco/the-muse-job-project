from django.contrib import admin
from .models import Job, Company, Industry
# Register your models here.


class JobAdmin(admin.ModelAdmin):
    list_display=('name', 'description', 'salary_bottom', 'salary_top', 'company', 'location', 'remote')
    fields=('name', 'description', 'salary_bottom', 'salary_top', 'company', 'location', 'remote')


admin.site.register(Job, JobAdmin)
admin.site.register(Industry)
admin.site.register(Company)

