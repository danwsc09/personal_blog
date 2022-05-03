---
sidebar_position: 2
title: SSR in Vue - Experiment with Hooks
---

Last updated: 2022/05/02

## Introduction
이번글은 [공식 문서](https://vuejs.org/guide/scaling-up/ssr.html)에 나와있는 예제를 변경시켜 보면서 lifecycle hook 들이 언제 어디서 작동하는지 살펴보려고 한다.

## Setup
```bash
$ npm init -y # 혹은 yarn init -y
$ yarn add express vue
$ touch server.js app.js client.js
```
이렇게 파일들을 생성한 후, [공식 문서 예제](https://stackblitz.com/edit/vue-ssr-example-rwhutx?file=index.js)에 나와있는 `server.js`, `app.js`, `client.js` 들을 복붙한다.  
`node server.js` 를 실행하면 `localhost:3000` 에서 확인할 수 있다.  
여기서 한가지 짚고 넘어가야할 부분은 `<script importmap>` 은 Chromium-based 브라우저 (크롬, 엣지) 에서만 작동한다. Firefox 에서는 작동하지 않는다!!

## Lifecycle Hooks

### Created
```js title="app.js"
    methods: {
        ...
    },
    // 추가
    created () {
        this.intervalTimer = setInterval(() => {
            this.count++;
            console.log('increment from setInterval; count:', this.count);
        }, 1000)
    },
```
`created` 함수 코드는 서버와 클라이언트에서 계속 실행되는걸 볼 수 있다. `created` 는 Vue 컴포넌트를 만들때 실행되는데, 서버에서 계속 실행이된다. 브라우저에서도 돌아간다.  
새로운 탭을 열어서 `localhost:3000` 탭을 한번 더 열면, 서버에서는 `setInterval` 이 두번 둘아가는걸 확인할 수 있다.  
`beforeCreate` 도 마찬가지로 서버에서 동작한는걸 확인할 수 있다. `create` 대신 `beforeCreate` 로 바꾸면 계속 콘솔에 찍힌다.  

#### 업무 경험
업무에서 SPA --> SSR 로 바꾸다가 카카오/네이버 로그인이 안되는 버그가 발생한 적이 있다.
그 이유는, oauth redirect 를 걸어놓는 페이지에서 `created` hook 내부에서 백엔드 api 한테 oauth token 값을 전달하는 코드가 있었다.
redirect url 은 대략 `http://domain.com/login/kakao?code={token}` 이었고 `created` 에서 이 `token`을 백엔드 api 한테 전달하고, 백엔드에서 이 `token` 을 activate 시키게 된다.
SPA 일때는 클라인트에서 이 컴포넌트를 만들때 한번만 호출해서 문제가 없었는데, SSR 로 바꾼 후에는 이 `token` 을 nuxt 서버 쪽에서 `created` hook 을 실행할 때 한번 호출하고, 브라우저에서 HTML 을 받고 hydrate 시키면서 `created` hook 을 다시 실행할때 두번째로 호출됬던게 문제였다.
두번째 호출할땐 이미 activated 된 `token` 이라는 에러 메세지가 왔었다.
이를 해결하기 위해선 `created` hook 을 `mounted` hook 으로 바꾸니 해결됬다.

#### Takeaway
`beforeCreate` 와 `created` 는 서버와 브라우저에서 한번씩 호출된다. 나머지 lifecycle hook 들은 (`beforeMount`, `mounted`, `beforeUpdate`, `update` 등) 브라우저에서만 실행된다등

### Mounted
```js title="app.js"
    methods: {
        ...
    },
    // 추가
    mounted () {
        console.log('mounted!')
    },
```
`mounted` (및 `beforeMount`) hook 과 그 이후 (lifecycle 기준) 에 쓰이는 hook 들은 전부 브라우저에서만 실행된다.  

#### 업무 경험
업무에서 또 다른 경험을 한적이 있다. 회사 프로젝트 메인 페이지에서 보이던 내용들이 갑자기 모바일에서 안보였다.
메인 페이지 컴포넌트는 대략 다음과 같이 생겼다.
```vue
<template>
  <div>
    <ChildComp1 />
    <ChildComp2 />
    ...
  </div>
</template>
<script lang="ts">
export default Vue.extend({
    ...
})
</script>
```
`ChildComp1` , `ChildComp2` 에서는 `created` hook 들 내부에서 api 콜로 데이터를 받아와서 렌더링하는 방식이었다. 
`ChildComp` 들이 렌더링 되지않는 현상은 SSR 로 바꾼후, `created` hook 들을 `beforeMount` hook 으로 옮긴 후 일어난 버그였다.
`beforeMount` 로 바꾼 이유는 다음과 같은 에러메세지 때문이었다.
![Vue Warning Mismatch](/img/Vue-warn-vdom-mismatch.png)
찾아보았을때 보통 이 이슈가 제일 많이 일어나는 이유 중 하나는 HTML 을 잘못 작성했을때 라고 한다. 이 전글을 보면 예제를 볼 수 있다. 
직접 코드를 확인 해 보았을땐 잘못 작성된 HTML 을 찾을 수 없었다. 
따라서 `created` hook 대신 `beforeMount` hook 을 사용했었는데 여기서 버그의 원인은 이상하게 `user-agent` 가 Safari iPhone (및 iPad Mini, iPod Touch) 인 경우, `beforeMount` hook 이 호출되지 않는 버그였다. 

## Conclusion
결론은 Nuxt SSR 을 이용할거면 프로젝트 처음부터 사용하는게 무조건 맞다. SSR 에 맞는 코드와 SPA 에 맞는 코드는 너무 다르다.  
각 lifecycle hook 들이 호출되는 시점도 고려해야 하고, 로그인 된 상태에서 새로고침을 하거나 주소창에 다른 페이지를 입력했을때 어떻게 로그인 상태를 유지할 것인지 등을 포함해서 고려할게 많다.  
또한, `plugin`, `middleware`, `module` 등 `nuxt.config.js` 를 통해 이용할 수 있는 기능들이 많은데 SSR 과 SPA 는 너무 다르다.  
일단, SPA 는 언급된 `plugin`, `middleware` 들이 모두 browser 에서 호출되기 때문에 코드를 편하게 작성할 수 있지만, SSR 은 처음 페이지를 불러올때 서버에서만 실행되고 (설정에 따라 브라우저에서도 실행되게 할 수 있다), 그 이후에는 browser 에서만 실행되기 때문에 신경을 더 많이 써야한다.  
아직 SPA --> SSR 으로 이전하는 작업이 끝나진 않았지만, 느낀게 많아서 어쩌다보니 일기처럼 적게되었다. 