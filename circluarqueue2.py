queue=[]
size=5
front = -1
rear =-1

#enqueue
def enqueue(item):
    global front,rear

    #queue ful condition
    if (rear + 1)% size == front:
        print("queue is full")
        return
    
    if front == -1:
        front = rear = 0
    
    else:
        rear = (rear+1)%size
    
    queue[rear] = item
    print("enqueued:",item)

def display():
    global front, rear

    if front == -1:
        print("queue is empty")
        return
    
    i = front
    while True:
        print(queue[i],end=" ")
        if i == rear:
            break
        i = (i+1 )%size
    print()


enqueue(10)    
enqueue(30)
enqueue(20)
enqueue(50)
display()