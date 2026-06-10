import numpy as np

# a = np.array([[2, 3, 4],
#               [6, 8, 9]])

# print(a.shape)
# print(a.ndim)
# print(a.size)
# print(a.dtype)


#How to create a basic array

# s=np.zeros(2)
# print(s)

# t=np.ones(1)
# print(t)

# e=np.empty(3)
# print(e)
#random num
# kk=np.random.default_rng()
# print(kk.random(5))
# print(kk.integers(5,size=(2,3)))


#uniqe no
# a=np.array([1,1,2,2,3,4,6,6])
# print(np.unique(a))


# j=np.arange(4)
# print(j)


# i=np.arange(1,10,2)
# print(i)

# #creates 6 equally spaced num
# k=np.linspace(0,10,num=6)
# print(k)


#adding removing and sorting elements
# h=np.array([1,3,47,7,5])
# print(np.sort(h))

# ar=np.array([1,3,4,53,5])
# arm=np.array([4,3,5,87,2])
# print(np.concatenate((ar,arm)))

#concatenate
# jj=np.array([[2,3,26,45],
#             [4,5,21,43]])
# kk=np.array([[9,8,10,90]])
# print(np.concatenate((jj,kk),axis=0))

# l=np.arange(9)
# print(l)
# b=l.reshape(3,3)
# print(b)
# print(b.transpose())

#shape and size of an array
# g=np.array([[[2,3,5,6],
#            [3,4,2,7]],
#            [[4,2,6,9],
#             [7,4,5,8]]])

# print(g.ndim)
# print(g.shape)
# print(g.size)


#indexing and slicing
# ar=np.array([[1,2,3,4,5],[10,73,45,77,18]])
# print(ar[ar < 73])
# print(ar[ar%2==0])
# print(ar[ar >= 10])
# print(np.sort(ar))
# print(ar[-2:])
# print(ar[1])
# print(ar[1,-2])
# print(ar[1, :-2])
# print(ar[(ar>10) & (ar<70)]) 
# print(ar[(ar<3) | (ar>=45)])
# c=np.nonzero(ar<10)
# print(c)
# print(np.nonzero(ar<11))
# d=np.nonzero(ar==100)
# print(d)

#How to create an array from existing data

# a=np.array([1,2,3,4,5,6,7,8])
# b=a[2:5]
# print(b)

#hstack and vstack

# s=np.array([[11,11],
#             [12,12]])
# ss=np.array([[13,13],
#              [14,14]])

# hstk=np.hstack(('s','ss'))
# print(hstk)
# vrtstk=np.vstack((23,78))
# print(vrtstk)

# f=np.array([1,2,4,5,3,6,7,8])
# print(np.hsplit(f,2))
# print(np.vsplit(f,2))

#copy and view
# b1=np.arange(12)
# b2=b1
# print(b2)
# b2[2]=11
# print(b2)
# b3=b1.copy()
# print(b3)
# b3[1]=77
# print(b3)
# print(b1)


ls = np.array([1,4,5,3,9])
np.sort(ls)

#Basic array operations
#addition, subtraction, multiplication, division, and more
# a1=np.array([1,2,3])
# a2=np.ones(3)
# print(a1)
# print(a2)
# a3=a1+a2
# print(a3)
# print(a1.sum())

# s=np.array([[1,4],
#     [2,4]])
# print(s.sum(axis=0))
# print(s.sum(axis=1))
# print(s.max(axis=1))
# print(s.max(axis=0))
# s1=s.sum(axis=0)

#Broadcasting
# k=np.array([1,2])
# print(k*5)
# print(k.min())

# print(s.max(axis=1))

#random 
# a=np.random.randint(8, size=6)
# print(a)

#random choice
# s=np.random.choice([1,2,3,6,8],size=3)
#print(s)

# np.random.seed(0)
# print(np.random.rand(3))

#uniqe
a=np.array([[1,1,3,4,2],[6,6,7,8,9]])
# print(np.unique(a))
# print(np.unique(a,axis=1))
# b=np.array([[1,2,4,5],[1,2,3,2],[1,2,4,5]])
# print(np.unique(b,axis=0))
# unique_row,indes,occorence=np.unique(a,return_counts=True,return_index=True)
# print(a)
# print(unique_row)
# print(indes)
# print(occorence)
# h=np.array([2,5,7,1,9])
# print(np.flip(h))
# hh=np.array([[2,3,7,8],[9,3,5,1]])
# print(hh)
# print(np.flip(hh))
# print(np.flip(hh,axis=0))
# print(np.flip(hh,axis=1))
# print(np.flip(hh,0))

# Reshaping and flattening multidimensional arrays
# s=np.array([[1,2,3,4],[5,6,7,8]])
# k=s.flatten()
# print(k)
# k[0]=11
# print(k)
# print(s)

# j=np.array([[1,2,3,4],[5,6,7,8]])
# y=j.ravel()
# print(y)
# y[0]=99
# print(y)
# print(j)

# a=np.array([1,2,3,4])
# np.save('jj.npy',a)
# b=np.load('jj.npy')
csv_1=np.array([1,2,4,5,6,8])
np.savetxt('newcsv.csv',csv_1)
np.loadtxt('newcsv.csv')
print(csv_1)
