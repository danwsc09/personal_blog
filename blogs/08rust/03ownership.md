---
sidebar_position: 3
title: Ownership
---

## How Memory Works in Rust
```rust
struct Person {
  name: String,
  birth: i32,
}

fn main() {
  let mut people = Vec::new();
  people.push(Person {birth: 1525, name: "Palentina".to_string()});
  people.push(Person {birth: 1563, name: "Dowland".to_string()});
  people.push(Person {birth: 1632, name: "Lully".to_string()});

  for person in &people {
    println!("Name: {}, Birth Year: {}", person.name, person.birth);
  }
}
```
- `people` exist on the stack, occupying 3 words; pointer to memory on heap, capacity of buffer, and length of vector.
- each `person` on the heap occupies 3 words + size of `i32`; pointer to string (for name), capacity of string buffer, length of string, and i32 representing birth year.  

"Owners" of data have a tree-like structure. When the owner is out of scope (freed), all of its children are freed.  
Data is dropped when:
- a variable goes out of scope
- an element is dropped from a vector

There are also *moves*, *reference-counted pointer* types `Rc` and `Arc`, and *borrowing*.

## Moves
The following scenarios *move* ownership of a value:
- Assigning a value to a variable
- Passing a value to a function
- Returning a value from a function

### Comparison to Python and C++
#### Python
```python
s = ["hi", "hello", "bye"]
t = s
u = s
```
- the list has a reference count of 3, since s, t, and u all point to it.  

#### C++
```cpp
using namespace std;
vector<string> s = {"hi", "hello", "bye"};
vector<string> t = s;
vector<string> u = s;
```
- we end with 3 vectors with 9 strings in memory that are deep copies.  

#### Rust
```rust
let s = vec!["hi", "hello", "bye"];
let t = s; // t "owns" the data; s is now uninitialized
let u = s; // throws an error, since s is uninitialized
```
`t` owns the 3-word value associated with the vector. When we try to assign `s` to `u`, we get a compiler error, since `s` is uninitialized after `t` takes the ownership.  
To get the `C++`-like behavior, we can use the vector's `clone()` method.
```rust
let s = vec!["hi", "hello", "bye"];
let t = s.clone();
let u = s.clone();
```

### Copy Types
`Copy` types are types where the `moves` don't leave the initial variable uninitialized. These include machine integer and float types, `char`s, `bool`s, and a tuple or fixed-size array of `Copy` types. `Copy` types don't have any values on the heap.  
`struct` and `enum` types aren't `Copy` types.