import pandas as pd
import numpy as np

s= pd.Series()
print("pandas",s)
data = np.array(['a','f','e','g','s','l'])


s=pd.Series(data)
print("pandas series:\n",s)

#data frame

df=pd.DataFrame()
print(df)

l=['apple','orange','grape']
df= pd.DataFrame(l)
print(df)

# loading data

df=pd.read_csv("students.csv")
print(df.head())

#info
print(df.info())

#selecting and filtering data
N=df[df["Age"]>15]
print(N)

#adding and removing coloumns 
df["marks"]=[79,66,89]
df["class"]=["A","A","B"]
print(df.head())

#groupig data
grp =df.groupby("class")['marks'].sum()
print(grp)

