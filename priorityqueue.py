x=[]
y=[]
x.append(20)
x.append(30)
x.append(50)
x.append(45)
x.insert(0,68)
print(x)
print(x[0])

y.append(x[3])
print(y)
#convert into asscending order 
x.sort()
print(x)
x.pop(0)
x.pop(0)
print(x)

#convert into descending order

x.sort(reverse=True)
print(x)

#randum priority pop
x.pop(1)
print(x)
