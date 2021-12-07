---
sidebar_position: 1
title: Centering an Input Icon
---

Last updated: 2021/12/7 Tue

## Introduction

조그만한 돋보기 아이콘을 input 요소 내부에 배치하려고 하는 HTML/CSS 들을 기록하는 글입니다.

## Design
![Design](/img/css/icon_in_input.png)
HTML 은 다음과 같이:
```html
<div class="container">
    <input
        class="searchbar"
        type="text"
        placeholder="가고 싶은 곳을 검색해보세요!"
    >
    <img
        class="searchbar-icon"
        src="~/assets/images/icons/search-blue.svg"
    >
</div>
```

CSS 는 다음과 같이:
```css
.container {
    width: 100%;
    position: absolute;
    bottom: -1.45rem;
}

.searchbar {
    width: 90%;
    height: 2.9rem;
}

searchbar-icon {
    position: absolute;
    right: 8%;
    top: 50%;
    transform: translate(0, -50%);
}
```
`top: 50%;` 와 `transform: translate(0, -50%);` 를 사용하여 vertical center 를 맞췄습니다.