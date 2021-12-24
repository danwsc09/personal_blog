---
sidebar_position: 2
title: Prim's Algorithm
---
Last updated: 2021/11/18 Thurs

## Introduction
Before we get to the algorithm, there are a few terms we need to be aware of.  
- **Connected graph**: all the nodes are connected  
- **Tree**: a connected acyclic graph  
- **Forest**: a unconnected acyclic graph  
- **Spanning tree**: a tree that connects (and therefore contains) every node in the graph
- **Minimum spanning tree**: the spanning tree of G whose cost (sum of weight of edges) is the least among any other spanning tree of G  

**Prim's algorithm** finds a minimum spanning tree by picking a random node and builds a spanning tree by using the greedy approach of selecting the edge with the least weight.

## Illustrations
In this example, we start off with node A, scan the edges from A, and pick the edge with the smallest weight. We choose C, since 5 < 8. Then, we scan all the available edges from C. We find that out of 8, 10, 3, and 16, 3 is the smallest, so we add C-D to our list. We also have to make sure that we are **not forming any cycles**.  
For instance, after we have 3 edges (A-C: 5, C-D: 3, D-B: 2), we can't pick the edge A-B: 8, because it would form a cycle A-B-C-D. We skip this and pick from the other edges.  
We use a **priority queue** to help us pick the next edge to add to our list.  
![1](/img/prims/prims_before.png)
![2](/img/prims/prims1.png)
![3](/img/prims/prims2.png)
![4](/img/prims/prims3.png)

## Pseudocode
```
def prims(G):
  s <- pick a source vertex from V

  for v in V:
    dist[v] = infinity
    prev[v] = Empty

  #initalize source
  dist[v] = 0
  prev[v] = s

  #update neighbouring nodes of s
  for node in s.neighbours
    dist[v] = w(s,node)
    prev[v] = s

  while(len(visited)<len(V)):
    CurrentNode = unvisited vertex v with smallest dist[v]
    MST.add((prevNode, CurrentNode))
    for node in CurrentNode.neighbours:
      dist[node] = min(w(CurrentNode, node), dist[node])
      if dist[node] updated: prev[node] = CurrentNode
    visited.add(CurrentNode)
  return MST
```

## Priority Queue with Handles
The code to implement Prim's algorithm was a bit tricky, at least initially. The tricky part was in implementing handles in the priority queue in order to update the nodes already stored in the priority queue.  
For instance, if I wanted to update the distance to vertex 3 from 20 to 15, I would have to call `PQ.update_key(3, 15)`. But how would the priority queue know the index of vertex 3 in its array, without doing a linear scan?  
The answer that I implemented used a simple **hash table** (dictionary in Python). The keys of this table is the vertex number and the values are the indices of the vertex in the array.  
Whenever **swap(i, j)** is called internally, not only are the elements of the array swapped, but the values of the hash table would be updated as well.  
Also, to save memory, whenever an element is removed, its key is removed from the handles. Without further ado, here is the code.
```python
class PriorityQueue:
  '''
  This min-heap has its usual public methods: remove_min and decrease_dist (decrease_key).
  It also has a public update_other() method to update the "other" property of each vertex.

  In order for decrease_dist to work, the PQ needs to keep a handle that maps
  the vertex number to its index in the array that is used internally by the heap.
  That's where self.handles comes in and updates each node's new position whenever
  self._swap() function is called.
  '''
  def __init__(self, N, vertices):
    self.arr = vertices

    self.handles = {}
    for i in range(N):
      self.handles[i] = i
  
  def decrease_dist(self, label, new_dist):
    index = self.handles[label]
    self.arr[index].dist = new_dist

    while index > 0 and self.arr[self._parent(index)].dist > new_dist:
      self._swap(index, self._parent(index))
      index = self._parent(index)
    return
  
  def remove_min(self):
    result = self.arr[0]
    
    # swap with last element
    self._swap(0, len(self.arr) - 1)

    # remove from heap/array and update handles
    self.arr.pop()
    del self.handles[result.label]

    self._min_heapify(0)
    return result
  
  def update_other(self, node_num, other_node_num):
    index = self.handles[node_num]
    self.arr[index].other = other_node_num

  def _min_heapify(self, index):
    left = self._left(index)
    right = self._right(index)
    if left < len(self.arr) and self.arr[left].dist < self.arr[index].dist:
      smallest = left
    else: smallest = index
    if right < len(self.arr) and self.arr[right].dist < self.arr[smallest].dist:
      smallest = right
    
    # if root isn't the smallest, swap
    if smallest != index:
      self._swap(index, smallest)
      self._min_heapify(smallest)
    return
  
  def _swap(self, index1, index2):
    node1 = self.arr[index1].label
    node2 = self.arr[index2].label
    tmp = self.arr[index1]
    self.arr[index1] = self.arr[index2]
    self.arr[index2] = tmp

    # update handles
    self.handles[node1] = index2
    self.handles[node2] = index1

  def _parent(self, index):
    return index // 2
    
  def _right(self, index):
    return index * 2 + 2
  
  def _left(self, index):
    return index * 2 + 1

class Vertex:
  def __init__(self, dist, label, otherVertex):
    self.dist = dist
    self.label = label
    self.other = otherVertex
    return
```

## Prim's Algorithm
The pseudocode for this was given above, so I'll cut to the chase and show the implementation here. The time complexity of this algorithm is O(E log V) where E represents the number of edges and V represents the number of verticies in a graph.
```python
def Prims(G):
  '''
  Input: a 2-D array: G
    - if G[i][j] > 0, there exists an edge from vertex i to j
    - with a weight of G[i][j]. If G[i][j] == 0, then there is no edge connecting i to j.

  Output: a tuple: (edges, minimum_distance)
    - edges - an array containing the edges that form a minimum spanning tree
    - minimum_distance - the distance of the minimum spanning tree
  '''
  SOURCE = 0
  N = len(G)
  MST = []
  MST_dist = 0

  # Vertices array that will be modified by the PriorityQueue
  vertices_heap = [Vertex(float('inf'), i, None) for i in range(N)]
  vertices_heap[SOURCE].dist = 0
  vertices_heap[SOURCE].other = SOURCE

  # Verticies dict that will be used to query dist and otherNode
  vertices_dict = {}
  for i in range(N):
    vertices_dict[i] = vertices_heap[i]

  PQ = PriorityQueue(N, vertices_heap)

  for i in range(N):
    # if there is an edge, update the heap of vertices
    if G[SOURCE][i] > 0:
      PQ.decrease_dist(i, G[SOURCE][i])
      PQ.update_other(i, SOURCE)

  PQ.remove_min()

  while len(MST) < N - 1:
    curr = PQ.remove_min()
    MST.append((curr.other, curr.label))

    for next in range(N):
      if G[curr.label][next] > 0 and G[curr.label][next] < vertices_dict[next].dist:
        PQ.update_other(next, curr.label)
        PQ.decrease_dist(next, G[curr.label][next])
    
    MST_dist += curr.dist
        
        
  return MST, MST_dist

```

## Conclusion
Both Dijkstra's algorithm and Prim's algorithm use a priority queue to find out which edge to visit next.  
In Dijkstra's algorithm, we don't have to update the key (distance) of an existing node. However, in Prim's, we do. That is why we need something called handles to keep track of where our vertices are in the array.  
For Dijkstra's, a built-in heap called heapq library is enough. For Prim's, we need a custom heap implementation so that we could call `decrease_key(vertex_number, new_key)` to update the distance to an existing vertex.  
Implementing Prim's algorithm was a lot more challenging than initially expected, but having gone through it all, it was an enjoyable experience.