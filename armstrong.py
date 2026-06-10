x=input("enter ur no :")
y=len(x)
h=0
for i in x:
    h+=int(i)**y
print(h)

if h==int(x):
    print("is armstrong")
else:
    print("not armstrong")