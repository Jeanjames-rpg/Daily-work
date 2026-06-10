import matplotlib.pyplot as plt 

#line graph
# x=[1,2,4,6]
# y=[3,2,5,6]

# plt.plot(x,y)
# plt.title("table")
# plt.xlabel("x axis")
# plt.ylabel("y axis")
# plt.show()

#bar chart
# x=[1,2,4,6]
# y=[3,2,5,6]

# plt.bar(x,y)
# plt.xlabel("x axis")
# plt.ylabel("y axis")
# plt.title("TABLE")
# plt.show()

#pie chart
# x=[1,2,4,6]
# y=[3,2,5,6]

# plt.pie(x,labels=y)

# plt.title("pie chart")
# plt.show()

#histogram

marks = [56,40,44,50,40,50]

plt.hist(marks, bins=5)
plt.title("histogram")
plt.xlabel("student name")
plt.ylabel("marks")
plt.show()