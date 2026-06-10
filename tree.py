tree={
    "A":["B","C"],
    "B":["D","E"],
    "C":[],
    "D":[],
    "E":[],
    

}
#value children
print(tree)
def tree_add(tree,parent,newnode):
    if parent in tree:
        tree[parent].append(newnode)
        tree[newnode]=[]
    else:
        print("no such parent")
    
def tree_remsubtree(tree,parent):
    if parent in tree:
        tree.pop(parent)
        
    else:
        print("no such parnt")  

def tree_remchild(tree,parent,childnode):
    if parent in tree:
        tree[parent].remove(childnode) 

def tree_remov(tree,parent,childnode):
    if parent in tree:
        tree.pop(parent)
    parent=input("enter parent")
    if parent in tree:
        tree[parent].remove(childnode)

tree_add(tree,"D","E")
print(tree)
tree_remsubtree(tree,"C")
print(tree)
tree_remchild(tree,"A","C")
print(tree)
tree_remov(tree,"D","E")
print(tree)