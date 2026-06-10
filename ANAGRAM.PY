
a=input("enter ur 1 string")
b=input("enter ur 2 string")
h=0
for i in a:
    if i in b:
        h+=1

if h==len(a) and h==len(b):
    print("anagram")
else:
    print(" not anagram")   
