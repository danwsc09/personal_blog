---
sidebar_position: 3
title: Union Find
---
Last updated: 2021/11/18 Thurs

## Introduction
Union find, or disjoint set, is used to find out if elements are connected to each other. It can be used to see who is friends with who in a social network or to detect a cycle in a graph.

## Implementation
This is an efficient implementation of union find.
- union(a, b) - **O(log N)**
- root(a) - **O(log N)**

```python
class UnionFind:
  def __init__(self, n):
    self.arr = [i for i in range(n)]
    self.rank = [1 for i in range(n)]
  
  def root(self, a):
    if a == self.arr[a]:
      return a
    self.arr[a] = self.root(self.arr[a])
    return self.arr[a]

  def union(self, a, b):
    rootA = self.root(a)
    rootB = self.root(b)

    if rootA == rootB:
      return

    if self.rank[rootB] > self.rank[rootA]:
      self.arr[rootA] = rootB
      self.rank[rootB] += self.rank[rootA]
    else:
      self.arr[rootB] = rootA
      self.rank[rootA] += self.rank[rootB]
    return
  
  def connected(self, a, b):
    return self.root(a) == self.root(b)
```

## Application
Among many useful applications, union find is used to implement Kruskal's algorithm for finding a minimum spanning tree.