---
id: my-doc-id
title: Formatting w/ markdown
description: My first description from start.
slug: /whatisurl
---

## 새로운 제목

제목을 적습니다. [여기를](./hi.md) 누르면 첫번째 항목으로!

## 링크 추가하기

relative file path 와 url path 둘다 가능합니다.

[여기를](./hi.md) 누르면 hi.md 로

## 이미지 추가하기

새로운 이미지 추가  
![Docusaurus logo](/img/docusaurus.png)  
아기공룡

## 코드 추가하기

```jsx title="src/components/Dinosaur.js"
function Dinosaur() {
  return <h1>Hello, Docusaurus.</h1>;
}
```

## 주의 사항 표시

이건 초록색:
:::tip 초록표시!
초록색이 좋아요
:::

그리고 이건 빨강색:
:::danger 빨간색 표시!
빨간책 ㅎㅎ
:::
그 다음줄

## MDX

export const Highlight = ({children, color}) => (
<span
style={{
      backgroundColor: color,
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
      cursor: 'pointer',
    }}
onClick={() => {
alert(`You clicked the color ${color} with label ${children}`)
}}>
{children}
</span>
);

This runs <Highlight color="#25c2a0">React code</Highlight> !

Can you <Highlight color="#1877F2">believe it</Highlight> ?
