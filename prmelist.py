
h=[]

n=int(input("enter ur no :"))
for i in range(2,n+1):
    for j in range(2,i):
        if i%j==0:
            break

    else:
            h.append(i)
        

print("prime list:",h)




