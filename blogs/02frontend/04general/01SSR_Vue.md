---
sidebar_position: 1
title: SSR in Vue
---

Last updated: 2022/04/30

## Introduction

Vue 를 이용해 SSR 을 알아본다. 내용은 [공식 문서를](https://vuejs.org/guide/scaling-up/ssr.html) 많이 참조했다.

## What is SSR
Vue 컴포넌트들을 서버에서 이용해 HTML string 으로 만들어 클라이언트에게 보낸 후, 필요한 부분은 클라이언트에서 JavaScript 를 통해 마무리 렌더링 및 JS 실행을 한다. 이걸 클라이언트에서 `hydrate` 시킨다고 표현한다.

## Why SSR (vs. SPA)

### 장점
1. 유저가 페이지들을 더 빠르게 볼 수 있다 (Faster time to content)
    - SPA 는 빈 HTML 만 받아와서 JavaScript 를 다운받은 후, 실행한 뒤에 보이기 시작한다.
    - SSR 은 이미 내용을 담은 HTML 을 받아오기 때문에 유저가 내용을 더 빨리 볼 수 있다.
2. Better SEO

### 단점
1. 브라우저에서 사용되는 코드들은 특정 lifecycle hook 에서만 써야한다.
2. Nodejs 서버가 돌아가는 환경에서만 쓰일 수 있다. (SPA 는 정적 파일들만 보낼수 있는 환경이라면 다 된다)
3. Nodejs 를 써야한다면 CPU 를 더 사용하기 때문에 사용자가 많으면 서버에 부하가 심할 수 있다.

### SSR vs SSG
Static Site Generation (SSG) 는 모든유저가 똑같은 내용을 보게 될때 사용하면 좋다. 빌드를 한번 해주고 HTML 만 보내주면 된다.  
몇몇 페이지에서만 SEO 를 향상 시키려고 한다면, (예: `/`, `/about`, `/contact`) SSG 가 SSR 보다 더 나을 수 있다.

## SSR in Vue
SSR 이 언급될때 Isomorphic 혹은 Universal 이 언급되는데, 이 이유는 서버에서 HTML 스트링을 만드는것과 클라이언트에서 JS 파일들이 처음으로 동작될 HTML 이 일치해야 하기 때문이다.   
SSR 을 이용할 때는, node 서버에서 SFC (Single File Component) 들을 HTML 스트링으로 전환한다. 원래는 Vue 자체에서는 Virtual Dom Render Function 으로 만든다.  


## SSR 에 적합한 Vue 코드 작성법

### Component Lifecycle Hooks
`mounted`, `updated` 는 SSR 때 호출되지 않는다. `beforeCreate` 와 `created` 들만 SSR 때 호출된다.  
따라서, `beforeCreate` 와 `created` 에서는 cleanup 을 해야할 코드를 실행하지 않는게 좋다.  
예를 들어, `setInterval` 을 쓸때, SPA 에서는 `created` 에서 `setInterval` 을 사용하고, `beforeUnmount` 혹은 `unmount` 에서 `clearInterval` 이 사용될 수 있다. SSR 에서는 `mounted` 에서 `setInterval` 을 호출하는게 더 낫다.

### 특정 플랫폼에서만 사용될 API
`window` or `document` 같이 브라우저에서만 사용되는 global 들은 SSR 에서 실행하려 할때 당연히 오류가 난다. 따라서 browser 에서만 사용될 코드를 작성할때는 `mounted` 훅을 사용하는게 낫다.  
또한 서버와 클라이언트에서 둘다 호출되는 코드가 있다면 (예: API 호출 - `fetch`), Nodejs 환경과 브라우저 환경 두군데에서 다 작동하는 코드를 써야한다. `fetch` 보단 `node-fetch` 를 사용하는게 나을 수 있다. `fetch` 는 Node 환경에서 (아직) 지원되지 않기 때문이다.  

### Hydration Mismatch
서버에서 보낸 HTML 과 브라우저쪽의 Virtual DOM 과 매치가 되지 않을때 생기는 에러다. 가장 흔한 예로는 `div` 를 `p` 안에 넣는 에러다.
```html
<p><div>hello</div></p>
```
은 보통 브라우저에서 다음과 같이 변환시킨다.
```html
<p></p>
<div>hello</div>
<p></p>
```

이렇게 되면 클라이언트에서 동작할 Vue 인스턴스가 DOM 을 어떻게 다룰지 혼란이 와서 예상대로 동작하지 않을 수 있다.

## Conclusion
SSR 이 뭔지, 그리고 SPA 와 어떻게 다른지 알아보았다. 다음글은 직접 SSR 을 해보면서 각종 `lifecycle hook` 들을 이용하면서 어떤식으로 동작하는지 체험해보는 글을 쓰려고 한다.