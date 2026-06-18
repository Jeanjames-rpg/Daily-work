from django.contrib import admin
from .models import Courses
from .models import Chapter

# Register your models here.
admin.site.register(Courses)
admin.site.register(Chapter)