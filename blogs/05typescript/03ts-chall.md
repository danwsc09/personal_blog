---
sidebar_position: 3
title: TypeScript Challenge
---
Last updated: 2022/06/27 Tues

# Introduction
[Youtube Video](https://www.youtube.com/watch?v=hBk4nV7q6-w) 를 보면서 TypeScript Challenge 를 풀어보는 과정이다. 

## Challenge 1
`Generics` 를 이용하는 첼린지이다. 
```tsx
import React from "react";

interface TableProps {
  items: { id: string }[];
  renderItem: (item: { id: string }) => React.ReactNode;
}

export const Table = (props: TableProps) => {
  return null;
};

export const Component = () => {
  return (
    <Table
      items={[{ id: "1" }]}
      renderItem={(item) => {
        return null;
      }}
    ></Table>
  );
};
```
여기서 generic 을 사용해서 어떻게 하면 `Table` 을 나중에 가져다 쓸떼 깔끔하게 할 수 있을까?

## Challenge 2
`value` 가 type 을 가지려면 function signature 를 어떻게 바꿔야 할까?
```ts
export const getDeepValue = (obj: any, firstKey: string, secondKey: string) => {
  return obj[firstKey][secondKey];
};

const obj = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: "12",
    d: 18,
  },
};

const value = getDeepValue(obj, "foo", "a");
```

### Extra
`zod` 라는 라이브러리로 API response 들을 정확하게 타입할 수 있다. 타입이 맞지 않으면 compile time 때 에러를 호출하고, 실제로 runtime 때도 error 를 발생시킨다.

## Challenge 3
`GetRequiredInformation` 에 타입을 어떻게 지정해야 `Animal` 일 경우엔 `{ age: number }` 로 나오고, `Human` 일 경우엔 `{ ssn: string }` 이 나오게 할 수 있을까?
```ts
type Animal = {
  name: string;
};

type Human = {
  firstName: string;
  lastName: string;
};

type GetRequiredInformation<TType> = ???;

export type RequiredInformationForAnimal = GetRequiredInformation<Animal>;

export type RequiredInformationForHuman = GetRequiredInformation<Human>;
```

## Challenge 9
어떻게 하면 `isArray` method 를 쓰지 않고 `a` prop 에 배열을 받지 않게 타입으로만 해결 할 수 있을까? 즉, runtime 말고 compile time 에 에러가 뜨게 할 순 없을까?
```ts
const deepEqualCompare = <Arg>(a: Arg, b: Arg): boolean => {
  if (Array.isArray(a) || Array.isArray(b)) {
    throw new Error("You cannot compare two arrays using deepEqualCompare");
  }
  return a === b;
};

deepEqualCompare([], []);
deepEqualCompare("a", "b");
```