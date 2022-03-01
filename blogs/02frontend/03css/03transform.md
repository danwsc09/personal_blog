---
sidebar_position: 3
title: CSS Transform
---

# Introduction
에니메이션 효과를 주기 위한 제일 좋은방법은 보통 `transform` 속성을 이용하는 것이다. 이 글은 `transform` 을 더 알아보려고 하는 글이다.

## Transform
`transform` 속성에 적용할 수 있는게 여러가지가 있다. `translate`, `scale`, `rotate`, 그리고 `skew` 가 대표적이다.

### Translate
```css
img {
  transform: translate(100px, 200px);
  transform: translateX(100px);
  transform: translateY(200px);
}
```
`translate` 은 이미지를 X 혹은 Y 방향으로 움직인다. 나름 단순하다.

### Scale
```css
img {
  transform: scaleX(2);
  transform: scaleY(2);
  transform: scale(2, 2);
}
```
`scale` 은 이미지를 확대 혹은 축소 할 수 있다. 이 역시 X 혹은 Y (아니면 모두) 방향으로 확대/축소 한다.

### Rotate
```css
img {
  transform: rotateX(20deg);
  transform: rotateY(20deg);
  transform: rotateZ(20deg);
  transform: rotate(20deg);
}
```
X 축은 화면의 가로 방향과 평행하고, Y 축은 화면의 세로 방향과 평행하다. Z 축은 화면에서 90도로 튀어 나온다. `rotate(20deg)` 는 `rotateZ(20deg)` 와 동일하게 작동한다.

### Skew
```css
img {
  transform: skewX(20deg);
  transform: skewY(20deg);
  transform: skew(20deg, 10deg);
}
```
`skew` 는 경사를 지게 한다. `skewX` 는 X 축은 그대로고 Y 축을 각지게 만든다고 생각할 수 있다. `skewX` 를 `90deg` 로 두면 X축으로 무한대로 길어진다.  
`skewY` 는 Y 축은 그대로고 X 축을 각지게 만든다.

## 순서
순서도 중요하다.
```css
img {
  transform: rotate(45deg) translateX(100px);
}
```
```css
img {
  transform: translateX(100px) rotate(45deg);
}
```
위 두개는 다르다. 처음 있는 속성이 적용된 후 그상태에서 다음게 적용된다. 처음껀 45도 돌리고 X 축으로 `100px` 만큼 움직인다. 돌린 상태에서 `100px` 만큼 움직이기 때문에 Y 축으로도 살짝 내려가게 된다.  
두번쨰는 X 축으로 움직인 후 돌리기때문에 X 축에 그대로 맞춰진다.


## Transition
`transition` 은 스타일이 변경될때 어떤 스타일이 어떻게 변경될지를 설정해준다. 4가지를 설정 할 수 있다. 변경할 스타일 속성, 걸리는 시간, 딜레이, 그리고 변경되는 스타일.
1. transition-delay - 몇초 후에 적용될지 지정한다.
2. transition-duration - 스타일이 변경되는데 걸리는 시간을 지정한다.
3. transition-property - 어떤 스타일이 변경될지 지정한다. (`all` 로 모두 같은걸로 지정 가능)
4. transition-timing-function - 스타일이 어떤 시간함수를 이용하여 변경할지 정한다. 
    - ease (default) - 시작과 끝은 천천히, 가운데는 빠르게
    - ease-in - 시작은 천천히
    - ease-out - 끝은 천천히
    - ease-in-out - 시작과 끝은 천천히
    - linear - 처음부터 끝까지 동일한 속도로
    - cubic-bezier(n, n, n, n) - custom 함수 이용

한번에 쓰기 위해 shorthand notation 을 쓸 수 있다.
```css
img {
  transition: width 1s 0.5s ease-in;
}
```
`width` 속성이 변경될때 0.5초 후에 1초에 걸쳐 `ease-in` (시작은 천천히) 바뀐다.
