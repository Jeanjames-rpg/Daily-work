# x="hello world"
# print(len(x))
# y=[1,2,3,4,5,5]
# print(len(y))
class car:
    def __init__(self,model,brand):
        self.model=model
        self.brand=brand
    def move(self):
        print("move")

c1=car("m3","bmw")
print(c1.brand,c1.model)
print(c1.move())

class boat:
    def __init__(self,model,brand):
        self.model=model
        self.brand=brand
    
    def move(self):
        print("sail")


b1=boat("zhing","yamaha")
print(b1.brand,b1.model)
print(b1.move())