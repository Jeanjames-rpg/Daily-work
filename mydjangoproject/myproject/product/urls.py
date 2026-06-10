from django.urls import path
from django.contrib import admin
from .views import products
from .views import product_list

urlpatterns =[
    path('product/<str:sid>',products),
    path('productlist',product_list)

]