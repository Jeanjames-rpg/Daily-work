
r=13


for i in range(1,6):
    a=int(input(f"enter your {i} st guess = "))
    if a>r:
        print("too high")
    elif a<r:
        print("too low")
    elif a==r:
        print("correct")