class car:
    def __init__(self):
        self.make="toyota"
        self.model="corola"
        self.year=1920


car1=car()
print(car1.make)

#parameter
class Car:
    def __init__(self,make,model,year):
        self.make=make
        self.model=model
        self.year=year

it=Car("maruti","alto",1990)
print(it.make)
print(it.year)

