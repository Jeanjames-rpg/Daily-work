from django.contrib import admin
from .models import Courses
from .models import Chapter
from .models import Enrollment

# Register your models here.
admin.site.register(Courses)
admin.site.register(Chapter)
admin.site.register(Enrollment)