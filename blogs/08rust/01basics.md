---
sidebar_position: 1
title: Overview
---
Last updated: 2022/01/29 Sat

## Introduction
최근에 Rust 를 공부해보고 있다. 여기선 공부하면서 배운 내용을 딱히 정리된상태가 아니더라도 기록하면서 나아가려고 한다.


## Basic Types
- byte literal - character-like literals for u8 values; ex: `b'X'`
  - escape chars - `b'\''`, `b'\\'`, `b'\n'`, `b'\r'`, `b'\t'`
  - byte literal in 2-digit hexadecimal - form: `b'\xHH'`; ex: `b'\x1b'` ( = 27)

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

### Result
There are 2 variants of a `Result` value.
- `Ok(v)` - `Ok` means the method call succeeded and the return value will be `v`
- `Err(e)` - `Err` means something went wrong and `e` is the explanation for the error.

`unwrap()` checks if a method did not fail.  
`expect('some error message')` ensures that a method runs but if there is an error, it prints the message.

```rust
numbers.push(u64::from_str(&arg))
  .expect("error parsing argument")
```
`from_str` is like `parseInt()` in JavaScript.

## Trait
Trait is a collection of methods that types can implement.
```rust
use std::io::Write;
use std::str::FromStr;
```
- `Write` trait has a `write_fmt` method that writes formatted text to a stream
- `FromStr` trait has a `from_str` method that parses a value of that type from a string.

## Ownership
```rust
let mut d = numbers[0];
for m in &numbers[1..] {
  d = gcd(d, *m);
}
```
- Ownership of vector should remain with `numbers`.
- `&` in `&numbers[1..]` borrows a **reference** to the vector's elements.
- `[1..]` looks at the memory locations of the `numbers` vector from the second element to the last element
- `*` in `*m` dereferences `m`, yielding the value that `m` refers to.