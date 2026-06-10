def mylist():
    yield 1
    yield 4
    yield "string"

for i in mylist():
    print(i)