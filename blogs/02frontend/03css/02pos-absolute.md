---
sidebar_position: 2
title: Padding, Position Absolute
---

Last updated: 2021/12/31 Fri

## Problem
다음과 같은 CSS 를 적용하는데, child 는 parent 의 padding 을 존중하지 않는다. child 가 parent 의 오른쪽 끝에 있는걸 볼 수 있다. 내가 원한건, `padding: 0 1rem` 을 존중해서, 오른쪽으로 부터 `1rem` 만큼 떨어져있는걸 원했다.
```css
.parent {
  position: relative;
  padding: 0 1rem;
  height: 100px;
  background-color: blue;
}

.child {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
}
```

## W3 Specification
https://www.w3.org/TR/CSS21/visudet.html#containing-block-details 여기의 4.2 를 보면, 'position: absolute' 인 요소들의 `containing block` 은 (`position: static` 이 아닌)부모의 `content box` 가 아닌 `padding edge` 에 맞춰 포지션이 된다.

## Solutions
### Add another HTML element
부모와 자식 사이에 `position: relative` 를 가진 HTML 요소를 투입하는것이다. 이 요소는 기존 부모의 `padding` 을 인식한다. 그 내부에 있는 기존 자식은 따라서 기존 부모의 `padding` 을 인식할 수 있다.

### Repeat padding on child
자식에 padding 을 넣는 방법도 있다고 한다. `padding-right: inherit;` 을 넣어서 자식도 똑같은 padding 을 가지게 할 수 있다. 하지만, 내가 이번에 쓰는 목적에서는, child 에 `border: 1px solid black` border 가 존재해서, 적합한 솔루션은 아니었다.


## Reference
참조: https://stackoverflow.com/questions/17115344/absolute-positioning-ignoring-padding-of-parent