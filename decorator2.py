def addition(fun):
    def wrapper(*arg,**kwargs):
        print("before function call")

        result = fun(*arg,**kwargs)
        print("after fun call")
        return result
    return wrapper

@addition
def add(a,b):
    return a + b
    

print(add(7,6))