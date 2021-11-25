---
sidebar_position: 1
title: Heap
---
Last updated: 2021/11/18 Thurs

## Basics
Heap is an array that you can think of as a nearly complete binary tree. You start at index 0, which is the root of the tree, then put index 1 and 2 as children of the root. You continue until you run out of nodes.  
![Heap](/img/heap/binaryheap.png) from: [geeksforgeeks](https://www.geeksforgeeks.org/binary-heap/)  

There are two kinds of heaps - max heap and min heap. They're very similar, so I will be only talking about min heaps for now. A min heap has this property: `A[parent(i)] <= A[i]`. That is, the value of the parent node is always smaller than or equal to the value of a given node. This holds for every node in the min heap.  
What this implies is that the **node at the top, at index 0, will always have the smallest value**.  
This can be used to build a priority queue.

## Priority Queue
If you have a pool of items that you want to remove one by one, starting with the smallest, then priority queue is what you use. It supports the following operations efficiently, compared to a normal array with linear search.  
A priority queue has the following operations:
1. Building a min heap from an array - **O(N)**; surprisingly enough, it takes O(N) time to build a heap from an existing array, and not O(Nlog N). This has to do with the fact that we are calling min_heapify from only half of the nodes (N // 2 - 1 to 0), or non-leaf nodes and each min_heapify takes O(log N) time.
2. Insert element - **O(log N)**
3. Remove minimum - **O(log N)**
4. Peek next element - **O(1)**
5. Check if it's empty - **O(1)**
6. Decrease key of an element - **O(log N)**

## Implementation
Enough talk, let's see some code. Okay, here it is, in Python.  
```python
class PriorityQueue:
  def __init__(self, arr=[]):
    self.arr = arr
    if len(arr) > 1:
      self._build_heap()
  
  def is_empty(self):
    return len(self.arr) == 0
  
  def peek(self):
    if self.is_empty():
      return
    return self.arr[0]

  def remove_min(self):
    if len(self.arr) < 1:
      print("Error - PQ is empty!")
      return

    result = self.arr[0]
    self._swap(0, len(self.arr) - 1)
    self.arr.pop()
    self._min_heapify(0)

    return result

  def insert_element(self, key):
    self.arr.append(float('inf'))
    self._decrease_key(len(self.arr) - 1, key)

  def _decrease_key(self, index, new_key):
    if new_key > self.arr[index]:
      print("Error - New key is greater!")
      return
    
    self.arr[index] = new_key
    while index > 0 and self.arr[self._parent(index)] > self.arr[index]:
      self._swap(index, self._parent(index))
      index = self._parent(index)
    return

  def _build_heap(self):
    for i in range(len(self.arr) // 2 - 1, -1, -1):
      self._min_heapify(i)
    return

  def _min_heapify(self, index):
    left = self._left(index)
    right = self._right(index)
    
    if left < len(self.arr) and self.arr[left] < self.arr[index]:
      smallest = left
    else: smallest = index

    if right < len(self.arr) and self.arr[right] < self.arr[smallest]:
      smallest = right
    
    if smallest != index:
      self._swap(index, smallest)
      self._min_heapify(smallest)
    return

  def _parent(self, index):
    return index // 2

  def _left(self, index):
    return index * 2 + 1

  def _right(self, index):
    return index * 2 + 2

  def _swap(self, i, j):
    tmp = self.arr[i]
    self.arr[i] = self.arr[j]
    self.arr[j] = tmp
```

To see if this actually works or not, I did a rather simple test on it, and it works just fine.
```python
if __name__ == '__main__':
  arr = [1, 7, 5, 8, 2, 4, 9]
  PQ = PriorityQueue(arr)
  PQ.insert_element(0)
  PQ.insert_element(3)
  PQ.insert_element(6)
  PQ.insert_element(10)
  while not PQ.is_empty():
    print(PQ.remove_min())
```
This outputs `0 1 2 3 4 5 6 7 8 9 10` in order.  

## Applications
Priority queues make a frequent appearance in some of the graph algorithms. One of the most famous graph algorithms that uses priority queues is Dijkstra's single source shortest path algorithm. Another well-known algorithm is called Prim's algorithm, which finds a minimum spanning tree of a connected graph. I will be talking about this in the next blog.