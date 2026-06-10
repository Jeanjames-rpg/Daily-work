from abc import ABC,abstractmethod

class vehicle(ABC):
    @abstractmethod
    def move(self):
        pass

class car(vehicle):
    def __init__(self,brand):
        self.brand=brand

    def move(self):
        print("drive")


class boat(vehicle):
    def __init__(self,brand):
        self.brand=brand

    def move(self):
        print("sail")

c1=car("bmw")
b1=boat("yamaha")
print(c1.brand,b1.brand)
print(b1.move())
print(c1.move())