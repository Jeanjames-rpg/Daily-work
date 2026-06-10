n=str(input("enter ur string:"))
count=0
vowels="aeiouAEIOU"
h=""
for i in n:
    if i in vowels:
        count+=1
    else:
        h=h+i


    
        
print(count)
print(h)