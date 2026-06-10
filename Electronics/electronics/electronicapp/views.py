from django.shortcuts import render
import csv
import os
import json
from django.conf import settings
from .models import Sales
from .models import Salesjson

# Create your views here.


def show_data(request):
    file_path = os.path.join(
        settings.BASE_DIR,
        'electronicapp',
        'templates',
        'Electronic_sales.csv'
    )
    
    data=[]

    with open(file_path,"r") as f:
        read=csv.reader(f)
        for row in read:
            data.append(row)
        
        print(data)
    return render(request,"data.html",{"data":data})

def mydata(request):
    sales=Sales.objects.all()
    return render(request,"tableformat.html", {"sales":sales})

def show_json(request):
    file_path = os.path.join(settings.BASE_DIR, 
                             'electronicapp',
                             'data2.json'
                             )

    with open(file_path,'r') as f:
        data = json.load(f)

    
    return render(request, "json.html", {"data":data})



def sos(request):
    data = Salesjson.objects.all()
    clean = []

    for i in data:
         clean.append({
            "Customer_ID": i.data.get("Customer_ID", "-"),
            "Age": i.data.get("Age", "-"),
            "Gender": i.data.get("Gender", "-"),
            "Loyalty_Member": i.data.get("Loyalty_Member", "-"),
            "Product_Type": i.data.get("Product_Type", "-"),
            "SKU": i.data.get("SKU", "-"),
            "Rating": i.data.get("Rating", "-"),
            "Order_Status": i.data.get("Order_Status", "-"),
            "Payment_Method": i.data.get("Payment_Method", "-"),
            "Total_Price": i.data.get("Total_Price", "-"),
            "Unit_Price": i.data.get("Unit_Price", "-"),
            "Quantity": i.data.get("Quantity", "-"),
            "Purchase_Date": i.data.get("Purchase_Date", "-"),
            "Shipping_Type": i.data.get("Shipping_Type", "-"),
            "Add_ons_Purchased": i.data.get("Add_ons_Purchased", "-"),
            "Add_on_Total": i.data.get("Add_on_Total", "-"),
        })

    print("TYPE:", type(data))
    return render(request, "sql.html", {"data": clean})

    
