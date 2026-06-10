from django.db import models


# Create your models here.
class Sales(models.Model):
    Customer_ID = models.IntegerField(primary_key=True)
    Age = models.IntegerField()
    Gender = models.CharField(max_length=10)
    Loyalty_Member = models.CharField(max_length=10)
    Product_Type = models.CharField(max_length=100)
    SKU = models.CharField(max_length=50)
    Rating = models.FloatField()
    Order_Status = models.CharField(max_length=20)
    Payment_Method = models.CharField(max_length=50)
    Total_Price = models.FloatField()
    Unit_Price = models.FloatField()
    Quantity = models.IntegerField()
    Purchase_Date = models.DateField()
    Shipping_Type = models.CharField(max_length=50)
    Add_ons_Purchased = models.CharField(max_length=100, db_column="Add-ons_Purchased")
    Add_on_Total = models.FloatField(db_column="Add-on_Total")

    class Meta:
        db_table = 'sales'
        managed = False

class Salesjson(models.Model):
    data = models.JSONField()

    class Meta:
        db_table ='sales_json'
        managed = False