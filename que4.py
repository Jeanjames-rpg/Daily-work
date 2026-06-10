size =5
que=[]
front=-1
rear=-1

def enqueue(item,front,rear,size):

    
    if rear == size -1:
        print("queue is full")
    if front == -1:
        front = 0

    rear+=1

    que.append(item)
    print("finished")
    return front,rear

def display(front,rear,size):
    if front==-1:
        print("empty queue")
    for i in range(front,rear+1):
        print(que[i],end=" ")
    return front,rear
    print()

def dequeue(item,front,rear,size):
    if front == -1:
        print("empty queue")

    if rear == -1:
        rear=0
    removd_itm= que[front]
    print("dequeue:",removd_itm)
    front+=1 

enqueue(10,front,rear,size)
enqueue(30,front,rear,size)
enqueue(40,front,rear,size)        
display(front,rear,size)

        
    