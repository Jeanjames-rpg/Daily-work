"""
URL configuration for policeproject project.

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
from policeapp import views
from policeapp.views import home
from policeapp.views import criminal_list
from policeapp.views import officer_list
from policeapp.views import police_station
from policeapp.views import Fir
from policeapp.views import vehicles
from policeapp.views import c_c

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cases/',views.case_list),
    path('home',home),
    path('criminals',criminal_list),
    path('officers',officer_list),
    path('stations',police_station),
    path('fir',Fir),
    path('vehicle',vehicles),
    path('cc',c_c)
]
