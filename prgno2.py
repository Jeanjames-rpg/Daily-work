a=[]
h={}
x=0
while x==0:
    item=input("enter the item:")
    if item=="done":
        x+=1
        break
    price=float(input("enter the price: "))
    print(f"{item} - {price}")
    a.append(price)
print(a)
h["total"]=sum(a)
h["no of items"]=len(a)
h["expensive"]=max(a)
print(h)

