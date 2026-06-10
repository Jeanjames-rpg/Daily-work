from django.shortcuts import render,redirect
from .models import Contact_details
import json
import csv
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ContactSerializer
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator



# Create your views here.
def calc(request):
    result=None

    if request.method == 'POST':
        num1= float(request.POST['num1'])
        num2= float(request.POST['num2'])
        operator = (request.POST['operator'])

        if operator=='+':
            result = num1+num2
        
        elif operator == '-':
            result = num1-num2
        elif  operator == '*':
            result = num1 * num2
        elif operator == '/':
            if num2 !=0:
                result = num1/num2
            else:
                print("cant be divided")
        
        elif operator == '**':
            result = num1**num2
        
        elif operator == "%":
            result = (num1*num2)/100


        elif operator == "//":
            if num2 !=0:
                result = num1//num2
            else:
                print("cant be divided")
    return render(request,"calc.html",{"result":result})

def contacts(request):
    if request.method == 'POST':
        name=str(request.POST["name"])
        email=str(request.POST['email'])
        phone=str(request.POST['phone'])
        password=str(request.POST['password'])
        confirm_password=str(request.POST['confirm_password'])
        location=str(request.POST['location'])

        if Contact_details.objects.filter(email=email).exists():

            return render(request,"register.html",{"error":"Email already exists"})


        if password != confirm_password:

            return render(request,"register.html",{"error":"password is not correct"})

        Contact_details.objects.create(
            name=name,
            email=email,
            phno=phone,
            password=password,
            location=location
        )

        return render(request,"register.html",{"sucess":True})
    return render(request,'register.html')
        
def contact_db(request):
    contact_data=Contact_details.objects.all()
    print(contact_data)
    return render(request,"allcontacts.html",{"contact_details":contact_data})

def contact_home(request):
    return render (request,"contact_home.html")

def json_data(request):
    data_json=list(Contact_details.objects.values())
    
    print(data_json)

    return render (request,'json.html',{'data_json':data_json})

def del_data(request,id):
    data=Contact_details.objects.get(id=id)
    data.delete()
    return redirect('/json/')

def update(request,id):
    data = Contact_details.objects.get(id=id)
    
    if request.method == "POST":
        data.name = request.POST['name']
        data.email = request.POST['email']
        data.phno = request.POST['phno']
        data.password = request.POST['password']
        data.location = request.POST['location']

        data.save()

        return redirect('/json/')
    
    return render(request,"update.html",{"data":data})


@api_view(['GET','POST'])
def contact_api(request):

    if request.method == 'GET':
        data = Contact_details.objects.all()

        serializer= ContactSerializer(
            data,
            many=True
        )

        return Response(serializer.data)
    
    elif request.method == 'POST':

        serializer = ContactSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)
        return Response(serializer.errors)    

@api_view(['PUT','DELETE'])
def api_updel(request,id):
    data = Contact_details.objects.get(id=id)


    if request.method == 'PUT':

        serializer = ContactSerializer(
            data,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)
        return Response(serializer.errors)
    
    elif request.method == 'DELETE':

        data.delete()

        return Response({"message":"DELETED SUCCESSFULLY"})

@api_view(['GET'])
def api_id(request,id):
    data = Contact_details.objects.get(id=id)
    if request.method == 'GET':
        serializer = ContactSerializer(
            data
        )

        return Response(serializer.data)
    
# def getdetail(request):

#     if request.method == 'POST':
#         id = request.POST['id']
    
#     return render (request,'iddetail.html')
#     data = Contact_details.object.get(id=id)

@api_view(['GET'])
def getview(request,id):

    data = get_object_or_404(Contact_details,id=id)

    serializer = ContactSerializer(data)

    return Response(serializer.data)

     
def iddetail(request):

    return render(request,'iddetail.html')


@api_view(['GET'])
def csvdata(request):

    import pandas as pd
    df = pd.read_csv("eletric.csv")

    df=df.fillna("")

    data = df.to_dict(orient='records')

    page_num = request.GET.get('page',1)

    paginator = Paginator(data,5)

    page_obj = paginator.get_page(page_num)

    return JsonResponse({
        "data":list(page_obj),
        "has_next":page_obj.has_next(),
        "has_previous":page_obj.has_previous(),
        "current_page":page_obj.number,
        "total_pages":page_obj.paginator.num_pages
    })

    # data=[]

    # with open('eletric.csv') as f:
    #     reader = csv.DictReader(f)
        
    #     for row in reader:
    #         data.append(row)
    
    # return JsonResponse(data,safe=False)

def cdv_view(request):

    return render(request,'csv.html')