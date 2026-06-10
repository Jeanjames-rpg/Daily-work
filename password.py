password="password"
i=0
while i<3:
    n=input("enter ur password:")
    if n==password:
        print("correct")
        break
    else:
        print("incorrect")
    i+=1
    print(i,"attempt over")
print("finished attempts")
