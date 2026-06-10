class Node:
    def __init__(self,data):
        self.prev = None
        self.data = data
        self.next = None
        
def insert_begin(head, data):
    new_node = Node(data)

    if head is not None:
        head.prev = new_node
        new_node.next = head
    head = new_node
    return head

def print_list(head):
    temp = head
    while temp:
        print(temp.data, end=" ⇄")
        temp = temp.next
    print("None")

head = None

head = insert_begin(head, 30)
head = insert_begin(head, 20)
head = insert_begin(head, 10)
print_list(head)
