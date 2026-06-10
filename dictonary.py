x=list(map(int,(input("enter ur inputs:").split())))
print(x)
h={}
h["max"]=max(x)
h["min"]=min(x)
h["sum"]=sum(x)
h["avg"]=sum(x)/len(x)
print(h)