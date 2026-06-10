#//     Write text//

        #file handiling functions:
        #  1.'r',read
        #  2.'w',write
        #  3.'a',append
        #  4.'r+',read+write

#   with open('myfile.txt','w') as f:
#     f.write("hello im jean")

# with open('myfile.txt','a') as f:
#     f.write("\nhow are you")

    #//reads all//
# # with open('myfile.txt','r') as f:
# #     print(f.read())       

# with open('myfile.txt','a') as f:
#      f.write("\nare u good")

# with open('myfile.txt','r') as f:
#     for i in f:
#         print(f.read())     


    ##### ####
# f= open('myfile2.txt','w')
# f.write("hello world")

# f=open('myfile2.txt','a')
# f.write("\ngood morning")
# f.close()

# f= open('myfile2.txt','w')
# f.writelines(["i am jean\n","whats ur name\n"])

# f=open('myfile2.txt','a')
# f.writelines(["\nwho are u","\nare u okay"])

# f=open ('myfile2.txt','r')
# print(f.readline())
# print(f.readline())

# f.seek(1)
# f=open('myfile2.txt','r')
# print(f.readlines())
# print(f.tell())
# f=open('myfile2.txt','r')
# s=f.readlines()
# for line in s:
#     print(line.strip())
# print(s)

# #whole file without \n
# f=open('myfile.txt','r+')
# f.truncate(5)
# f.close()
# # f=open('myfile2.txt','r')
# # for line in f:
# #     print(line.strip())

# f.close()


             ##   with pandas ##
# Important Functions
# Function	Purpose
# pd.read_csv()	Read file
# variablename.head()	First 5 rows
# variablename.tail()	Last 5 rows
# variablename.to_csv()	Write file

import pandas as pd
# d=pd.read_csv("myfile2.txt")
# print(d)

#space separated output
# df=pd.read_csv('myfile2.txt',sep=" ")
# print(df)

# dg=pd.read_csv('myfile2.txt',header=None)
# print(dg)

# dc=pd.read_csv('myfile2.txt',header=None)
# for index,row in dc.iterrows():
#     print(row[0])

# print(dc.head())
# print(dc.tail())

# data={
#     "Name":["jean","john"],
#     "age" :["20","22"],
# }

# dc=pd.DataFrame(data)
# dc.to_csv("output.txt",index=False)

# dc=pd.read_csv("output.txt")
# print(dc)

    
         #visualisation
                ##using matplotlib

#--> Important Functions
#   Function	Use
#   plt.plot()	Line graph
#   plt.bar()	Bar chart
#   plt.pie()	Pie chart
#   plt.scatter()	Scatter plot
#   plt.show()	Display graph

    #line graph
import matplotlib.pyplot as plt
# x=[1,2,3,5,4]
# y=[7,9,5,3,1]

# plt.plot(x,y)
# plt.show()

#line plot
# plt.plot([1,2,3,4],[6,7,8,9])
# plt.show()

#bar chart
# plt.plot(['a','b','c'],[4,2,8])
# plt.show()

#pie chart

# plt.pie([2,6,4], labels=["a","b","c"])
# plt.show()

#scatter plot
# plt.scatter([3,4,7],[1,9,2])
# plt.show()

#adding labels and title
# plt.plot([1,2,3,4],[6,8,9,10])
# plt.title("My graph")
# plt.xlabel("x axis")
# plt.ylabel("y axis")
# plt.show()

#Customizing
# plt.plot([3,4,7],[1,9,2],color="red",linestyle="--",marker=1)
# plt.show()

        #using pandas
#import pandas as pd
#import matplotlib.pyplot as plt
data={
    "Name":["jean","john"],
    "mark":[80,78],
}
d=pd.DataFrame(data)
d.to_csv("data.csv",index=False)
d=pd.read_csv("newcsv.csv")
d.plot(xlabel="Mark",ylabel="Name",title="Stdnt report")
plt.show()