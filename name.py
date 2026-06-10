# name = "jean"
# print(name)
# print(type(name))
# age = 20
# print(type(age))
# print(name.upper())
# print("HELLO".lower())
# print("HELLO".replace("E","A"))
# print("hello".replace("lo","ho"))
# print("malayalam".replace("lam","lem"))
#print("malayalam".replace("ya","ye"))
#print("malayalam".replace("l","1"))
# fruits=["apple","orange","grapes"]
# print(fruits[2])
# print(fruits.index("apple"))
# fruits.append("mango")
# print(fruits)
# fruits.insert(2,"pineapple")
# print(fruits)
# fruits.remove("grapes")
# print(fruits)
# fruits.pop()
# print(fruits)
# fruits.clear()
# print(fruits)
# fruits=("apple","orange","mango")
# print(fruits)
# print(fruits.count("apple"))
# print(fruits.index("mango"))
# print(fruits)
# x=list(fruits)
# print(x)
# x.append("mango")
# fruits=tuple(x)
# print(fruits)
# fruits = {"apple","orange","mango","apple"}
# print(fruits)
# fruits.add("grape")
# print(fruits)
# fruits.remove("apple")
# print(fruits)
# fruits.discard("pineapple")
# print(fruits)
# fruits.pop()
# print(fruits)
# fruits.clear()
# print(fruits)

# s1={1,2,3,4}
# s2 ={3,4,5,6}
# print(s1.union(s2))
# print(s1.intersection(s2))
# print(s1.difference(s2))
# print(s1.symmetric_difference(s2))

# 
# x=int(input("enter your value"))
# y=7
# print(x==y)
# print(x!=3)
# print(x>4)
# print(x<5)

# print(x>y and y==3)
# print(x>y or x==3)
# print(not x==8)

# print(list(range(1,11)))

# for i in range(6):
#     print(i,end=",")

# i = 0
# while i<6:
#     print(i)
#     i+=1
# for i in range (10):
#     if i ==5:
#         break
#     print(i)
# else:
#     print("complete")
# age=int(input("enter ur age"))
# print(f"you are {age} years old")
# try:
#     age=int(input("enter ur age"))
#     print(f"you are {age} years old")
#     print("you are ",age,"years old")
# except:
#     print("please emnter a valid no")
# x=(1,2,3,4)
# print(x[5])
#list comprehnsion
fruits = ["apple", "banana", "cherry", "kiwi", "mango"]
newlist = [x for x in fruits if "a" in x]
# Output: ['apple', 'banana', 'mango']