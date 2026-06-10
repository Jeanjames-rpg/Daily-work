x=int(input("enter ur no:"))
d=[]

for i in range(1,x+1):
    c=str(i)
    y=len(c)
    h=0
    for j in c:

        h+=int(j)**y
        
        if i==h:
            d.append(i)
    
print("the armstrong no are:",end=" ")
print(d)
