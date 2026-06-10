# from collections import deque
# que= deque()
# que.append(10)
# que.append(20)
# que.append(30)

# print(que)

# que.popleft()
# print(que)
size = 5
que = []
front = -1
rear = -1

#enqueue
def enqueue(item):
    global front,rear

    if rear == size - 1:
        print("queue is full")
        return

    if front == -1:
        front = 0
    
    rear += 1
    # que[rear] = item   #if not empty list
    que.append(item)
    print("enqueued:", item)

def dequeue(item):
    global front, rear

    if front == -1 or front>rear:
        print("empty queue")
        return None
    
    if rear == -1:
        rear = 0
    removed_itm = que[front]
    front+=1

    print("deueued:",removed_itm)
    return removed_itm

def display():
    if front == -1 or front > rear:
        print("Queue is empty")
        return
    
    for i in range(front, rear + 1):
        print(que[i],end=" ")
    print()

enqueue(10)
enqueue(20)
enqueue(30)
display()
dequeue(front)
display()
dequeue(front)
display()
