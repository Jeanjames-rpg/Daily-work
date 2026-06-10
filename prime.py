n=int(input("enter ur no :"))
x=0
for i in range (2,n+1):
    if n%i==0:
        x+=1

if x<2:
    print("prime")
        
else:
    print(" not prime")      

    