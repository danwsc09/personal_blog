---
sidebar_position: 4
title: References
---

## References

### Shared References
Syntax: `&e`
- can read, but not modify its referent
- can have multiple shared references
- shared references are `Copy`
- 'multiple readers'

### Mutable References
Syntax: `&mut e`
- can read and modify its referent
- there must be no other references to `e` at the same time
- mutable references are not `Copy`
- 'single writer'

## Static
- Every static must be initialized.
- Mutable statics are not thread-safe, since any thread can access the data segment.
  - Mutable statics can only be accessed in an `unsafe` block.