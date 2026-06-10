# x= int(input("enter your first no"))
# y=int(input("enter your second no"))

# print(x+y)
# print(x*y)
# print(x-y)
# print(x/y)
# print(x**y)
# print(x//y)
# print(x%y)

x= float(input("enter your first no"))
y=float(input("enter your second no"))
z=input("enter your operator")


def add(x,y):
    add=x+y
    return add

def sub(x,y):
    sub=x-y
    return sub

def prod(x,y):
    prod=x*y
    return prod

def div(x,y):
    div=x/y
    return div
    
if z == '+' :
    print(add(x,y))
elif z== '-' :
    print(sub(x,y))
elif z== '*' :
    print(prod(x,y))
elif z== '/'and y!=0 :
    print(div(x,y))
elif z== '%' and y!=0:
    print(x%y)
elif z== '//' and y!=0 :
    print(x//y)
elif z== '**' :
    print(x**y)
else:
    print("invalid")