---
sidebar_position: 2
title: TS Docs (1)
---
Last updated: 2021/11/25 Thurs

## Introduction
TypeScript 공식문서를 보면서 몰랐던거나 특이했던것들만 적어보려고 한다. Handbook 을 읽으면서 본 내용들에 관한것들이다.

### Call Signatures
Function Type Expression 은 함수가 어떻게 생겼는지 설명해준다.
```ts
type GreeterFunction = (a: string) => void;
```
Call Signature 도 비슷한걸 해준다.
```ts
type DescFunction {
  (someArg: number): boolean
}
```