"""
URL configuration for mycalculator project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from calculatorapp.views import calc
from calculatorapp.views import contacts
from calculatorapp.views import contact_db
from calculatorapp.views import contact_home
from calculatorapp.views import json_data
from calculatorapp.views import del_data
from calculatorapp.views import update
from calculatorapp.views import contact_api
from calculatorapp.views import api_updel
from calculatorapp.views import api_id
# from calculatorapp.views import getdetail
from calculatorapp.views import getview
from calculatorapp.views import iddetail
from calculatorapp.views import csvdata
from calculatorapp.views import cdv_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('c/',calc),
    path('register',contacts),
    path('show',contact_db),
    path('home/',contact_home),
    path('json/',json_data),
    path('delete/<int:id>/',del_data),
    path('update/<int:id>/',update),
    path('api/',contact_api),
    path('api/<int:id>',api_updel),
    path('id/<int:id>',api_id),
    path('h/<int:id>/',getview),
    path('iddetail/',iddetail),
    path('csv/',csvdata),
    path('cdvview',cdv_view)
    # path('idfront/',getdetail)
]
