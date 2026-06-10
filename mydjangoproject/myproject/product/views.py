from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.


prod_data={
        "111":{
            "id":"111",
            "name":"kit-kat",
            "price":20,
            "flavour":"chocolate",
            "otherflavours":["vanilla","pista","coconut"]
            },

        "222":{
            "id":"222",
            "name":"Snickers",
            "price":40,
            "flavour":"chocolate",
            "otherflavours":["vanilla","pista","coconut"]
            }
    }
def products(request,sid):
    templ=loader.get_template("products.html")
    data=prod_data.get(sid)
    res = templ.render(data,request)
    return HttpResponse(res)



def product_list(request):

    temp=loader.get_template("productlist.html")

    data={
        "prodlist":prod_data
    }

    result=temp.render(data,request)
    return HttpResponse(result)
