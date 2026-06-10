def create_node(data):
    return[data,None]
def get_data(node):
    return node[0]
def get_next(node):
    return node[1]
 
def set_next(node, next_node):
    node[1] = next_node

def print_list(node):
    while node is not None:
        print(get_data(node),end="->")
        node = get_next(node)

def insert_bgn(head, data):
    new_node=[data,head]
    return new_node

def insert_end(head, data):
    new_node = create_node(data)

    if head is None:
        return new_node
    
    temp = head
    while get_next(temp) is not None:
        temp = get_next(temp)
    
    set_next(temp, new_node)
    return head

def insert_pos(head, data, pos):
    new_node = create_node(data)

    if pos == 1:
        return insert_bgn(head,data)
    
    temp = head
    count = 1

    while count < pos - 1 and get_next(temp) is not None:
        temp = get_next(temp)
        count += 1
    
    set_next(new_node, get_next(temp))
    set_next(temp, new_node)

    return head

def del_begin(head):
    if head is None:
        return None
    return head[1]

def delete_end(head):
    if head is None or get_next(head) is None:
        return None
    temp = head
    while get_next(get_next(temp)) is not None:
        temp = get_next(temp)

    set_next(temp,None)
    return head

def del_pos(head,pos):
    if pos == 1:
        return get_next(head)

    temp = head
    count = 1

    while count < pos -1 and get_next(temp) is not None:
        temp = get_next(temp)
        count += 1

    if get_next(temp) is not None:
        set_next(temp, get_next(get_next(temp)))

    return head    

node1 = create_node(10)
node2 = create_node(20)
node3 = create_node(30)

set_next(node1, node2)
set_next(node2, node3)

node1=insert_bgn(node1,50)
print_list(node1)
node1=insert_end(node1,70)
node1=insert_pos(node1,80,3)
node1=insert_pos(node1,75,2)


# print(get_data(node1))
# # print(get_next(node1))

node1=insert_bgn(node1,50)
node1=del_begin(node1)
node1=delete_end(node1)
node1 = del_pos(node1,3)
print_list(node1)