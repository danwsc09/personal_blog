---
sidebar_position: 2
title: TS Docs 1
---
Last updated: 2021/11/25 Thurs

## Introduction
TypeScript 공식문서를 보면서 몰랐던거나 특이했던것들만 적어보려고 한다. Handbook 을 읽으면서 본 내용들에 관한것들이다.

## Call Signatures
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
여기까지 둘은 똑같다 (함수가 생긴건 다르지만). 하지만 다른점이 있다면, 그건 바로 함수에 property 를 추가할 수 있다는 점이다.
```ts
type DescFunction {
  (someArg: number): boolean,
  description: string
}
const fn1: DescFunction = (arg: number): boolean => {
  return arg % 2 === 0;
}
fn1.description = "Even Function";
```

## Generics
Generics 는 함수의 input 과 output 을 연관짓거나, 혹은 input 2개 이상이 관련이 되있을때 쓰인다.
```ts
function firstElem<Type> (arr: Type[]): Type | undefined {
  return arr[0]
}
firstElem([1,2,3]) // 1 (number)
firstElem(["a", "b", "c"]) // "a" (string)
firstElem([]) // undefined
```
Generics 가 없었다면 `number[]`, `string[]`, 등 여러 종류의 input 을 각각 처리하는 함수들을 만들어야 했을것이다.  

### Constraints
함수의 타입을 Constraint 로 조금이나마 더 구체화 시킬 수 있다.
```ts
function minimumLength<Type extends { length: number }> (
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    return { length: minimum }; // error
  }
}
```
이 함수에서 `Type` 이 `length` 라는 number property 를 가지는걸 constraint 라고 한다.  
이 함수는 에러가 하나 있다. `obj` 에 들어온 타입과 같은 타입을 리턴해야 하는데, `{ length: minimum }` 만 리턴될 수 있게 되있다.  
이렇게 생각할 수 있다. `Animal` 객체가 있고, 이를 상속하는 `Dog` 와 `Cat` 이 있다고 가정하자. 이 함수에 `Dog` 를 첫째 input 으로 주면 output 도 `Dog` 여야 한다. 위에서 `{ length: minimum }` 을 리턴하는건 `Animal` 객체를 리턴해버리는것과 같다. 리턴하는 객체가 `Cat` 일 수도 있는데 말이다. `Dog` 는 `Animal` 이 될 수 있는데 `Animal` 이 꼭 `Dog` 라는 법은 없다. 꼭 `Dog` 를 리턴해야 한다. 그래서 `{ length: minimum }` 를 리턴하는건 틀린 코드이다.

## Function Overloads
Java 같은 언어처럼 함수를 오버로딩 할 수 있다. 타입스크립트에서 오버로딩 할 때 `overload signature` 와 `implementation signature` 들이 있다.  
- `overload signature`: 한줄짜리 코드고, function body 는 쓰지 않는다. 또한, 최소한 2개 이상 있어야 한다.
- `implementation signature`: 실제로 function body `{ ... }` 를 정의하는 곳이다. input 은 `overload signature` 에 정의되있걸 다 포함해야 한다.
```ts
function makeDate(timestamp: number): Date; // overload
function makeDate(m: number, d: number, y: number): Date; // overload

function makeDate(mOrTimestamp: number, d?: number, y?: number): Date { // implementation
  if (d !== undefined && y !== undefined)
    return new Date(y, mOrTimestamp, d);
  else
    return new Date(mOrTimestamp);
}
```
이렇게 정의되있는 `makeDate` 함수를 실제로 호출할때는 1개 혹은 3개의 parameter 가 있어야 한다. 2개가 있을땐 컴파일 에러가 뜬다.
```ts
makeDate(12345678); // ok
makeDate(3, 4, 1999); // ok
makeDate(1999, 1); // compile error
```

Redux 의 `createStore` 함수도 overload 를 쓰는걸 볼 수 있다 ([링크](https://github.com/reduxjs/redux/blob/master/src/createStore.ts)).  
`createStore` 를 호출할때 `reducer` 는 꼭 있고, `preloadedState` 와 `enhancer` 는 있을 수 있고 없을 수 있다. 정확히는, input 이:
- 1개일때: `reducer`
- 2개일때: `reducer`, `enhancer`
- 3개일때: `reducer`, `preloadedState`, `enhancer`
순으로 정의되있는걸 확인할 수 있다.