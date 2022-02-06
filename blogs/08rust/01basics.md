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