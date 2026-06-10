graph={
    "A":["B","C","D"],
    "B":["C","E"],
    "C":["E","B","A"],
    "E":["C","B"]
    
}
print(graph)
def insrt_graph(neighbour,vertice):
    graph[neighbour].append(vertice)
    graph[vertice] =[]
def insrt_graph2(neighbour1,neighbour2,vertices):
    graph[neighbour1].append(vertices)
    graph[neighbour2].append(vertices)
    graph[vertices]=[]

def removgraph(vertice):
    graph.pop(vertice)
    h=graph.keys()
    
    print(h)
    for i in(h):
        if vertice in graph[i]:
            graph[i].remove(vertice)
        
insrt_graph("E","F")    
insrt_graph2("A","B","H")
print(graph)
removgraph("E")
print(graph)
# print(graph.values())
# print(graph.keys())
