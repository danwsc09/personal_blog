---
sidebar_position: 2
title: Vectors and Strings
---

## Arrays/Vectors/Slices

### Vector
There are 3 common ways of initializing a vector.
1. `vec!` macro
```rust
let mut v = vec![1, 2, 3, 4];
```

2. `Vec::new()`
```rust
let mut v = Vec::new();
v.push(1); v.push(2); v.push(3); v.push(4);
```

3. `.collect()` from an iterator
```rust
let mut v = (0..5).collect();
```

4. `Vec::with_capacity(number)` to create a dynamic array with a given capacity
```rust
let mut v = Vec::with_capacity(2);
assert_eq!(v.len(), 0);
assert_eq!(v.capacity(), 2);
```

A vector has 3 pieces of information.
1) Pointer to heap-allocated buffer that holds the elements
2) The capacity of the buffer - `capacity()`
3) The number of elements actually inside the vector `len()`
Slice has 1) and 3).

#### Methods
- `.reverse()` - reverses array in place (by implicitly borrowing a &mut [&str])
- `.len()`, `.capacity()`
- `.insert(index, element)`
- `.pop()` - returns `Option<T>`; `Some("str")` or `None`

### Slice
`[T]` is a region of an array or vector. A slice is always passed by reference. A reference to a slice is a *fat pointer*; two-word value containing the pointer to the first element and the number of elements in the slice.  
`&[T]` is a reference to a slice, which is what we usually mean when we talk about slices.

## Strings

### String Literals
- enclosed in double quotes; ex: `"\"Hello\", said the man.\n"`
- a string can span multiple lines; it will include the newline character and the leading spaces.
  - if a line ends with a backslash, the newline character and the leading spaces won't be a part of the string.
- **raw strings** are of the form `r"C:\Program Files"`. No escape sequences are recognized.
  - can also add pound signs to include double quotes.
  - ex: `r###"This raw string started with 'r###"'. It doesn't end until we reach a quote mark followed by three pound signs."###r`

### Byte String
A string literal with the `b` prefix is a byte string.
- slice of `u8` values (bytes), instead of Unicode text.
- must consist only of ASCII characters
```rust
let method = b"GET";
assert_eq!(method, &[b"G", b"E", b"T"]);
```

- can combine with raw strings.
  - ex. br"abcdef \ (newline) abcde"

Strings have 3 pieces of information (similar to Vec). Strings in Rust are sequences of unicode characters, but are stored as UTF-8, a variable width encoding.
1) pointer to first element
2) capacity of buffer
3) length of actual string
`&str` has 1) and 3).

## String and Vector
They are very similar to each other.
1) Automatically frees buffers
2) Growable
3) ::new() and ::with_capacity() methods
4) .reserve() and .capacity() methods
5) .push() and .pop() methods
6) Range syntax with `[start..stop]` - `Vec<T>` returns `&[T]` ; `String` returns `&str`
7) Automatic conversion - `&Vect<T>` to `&[T]` ; `&String` to `&str`
8) Inherits methods from `&[T]` / `&str`

### Other Things to Note
Arrays, slices, and vectors of strings have `.concat()` and `.join()` methods.
```rust
let bits = vec!["a", "b", "c"];
assert_eq!(bits.concat(), "abc");
assert_eq!(bits.join("_"), "a_b_c");
```
