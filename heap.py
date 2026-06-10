# import heapq

# heap=[45,32,2,89,35]
# print(heap)
# heapq.heapify(heap)
# print(heap)
# smallst_elmnt=heapq.heappop(heap)
# print("smallst elmnt ",smallst_elmnt)
# print(heap)
heap=[30,45,3,56]
# dicttion={}
print(heap)
heap.append(1)
print(heap)
heap.append(20)
print(heap)
# dicttion = max(heap)
# print(dicttion)
heap.sort()
print(heap)
heap.pop(0)
print(heap)
lenght=len(heap)
def maxheap():
    heap.sort(reverse=True)
    print(heap)
    for i in range (lenght):
        removd_elmnt=heap.pop(0)
        print(i)
        print("removed elemnt:",removd_elmnt)

# def minheap():
#     heap.sort()
#     print(heap)
#     for i in range(lenth):
#         removdelm=heap.pop(0)
#         print("removd elmnt:",removdelm)
maxheap()
# minheap()
print(heap)
