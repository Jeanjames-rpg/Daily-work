x= int(input("enter your mark:"))

if x>=90 and x<=100:
    print("A")
elif x>=80 and x<=100:
    print("B")
elif x>=70 and x<=100:
    print("C")
elif x>=60 and x<=100:
    print("D") 
elif x>=50 and x<=100:
    print("E")
elif x<50 and x>=0:
    print("fail")
else:
    print("invalid")