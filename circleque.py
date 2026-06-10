class circularque:
    def __init__(self, size):
        self.size = size
        self.queue = [None]*size
        self.front = self.rear = -1

    def enqueue(self ,item):
        if (self.rear + 1)% self.size == self.front:
            print("Queue is full")
            return
        
        elif self.front == 1:
            self.front = self.rear = 0
        
        else:
            self.rear =(self.rear + 1) % self.size
        self.queue[self.rear]= item
        print(f"enqueued: {item}")
    
    def dequeue(self):
        if self.front == -1:
            print("Queue is empty")
            return None

        removed_item = self.queue[self.front]
        if self.front == self.rear:
            self.front = self.rear = -1
        
        else:
            self.front = (self.front + 1) % self.size
        print(f"dequeued: {removed_item}")
        return removed_item


cq = circularque(3)
cq.enqueue(1)
cq.enqueue(2)
cq.enqueue(3)
cq.dequeue() #dequed 1
cq.enqueue(4) #enueued 4 use empty space at front