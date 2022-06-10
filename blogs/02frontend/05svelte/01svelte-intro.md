---
sidebar_position: 1
title: Svelte Basics
---

Last updated: 2022/06/10

# Introduction

항상 들어보기만 해보고 사용해보지 않았던 Svelte 를 사용해보기로 했다. [링크](https://svelte.dev/tutorial/basics)를 통해서 익혀본 기본적인 내용들을 보려고 한다.  
한가지 정말 재미있는 점은 `React` 혹은 `Vue` 는 javascript 로 transpile 되지만, `Svelte` 는 HTML/JS 로 compile 이 된다. 예를 들면, `react` 에서는 `SyntheticEvent` 를 거쳐서 이벤트가 발생하는데, `Svelte` 는 Vanilla JS 에서 사용하는 `event` 그대로를 호출하게 compile 이 된다.  
`package.json` 을 보면, `svelte` 는 `devDependency` 에 해당하는걸 확인할 수 있다. 아래는 `vite` 로 `svelte` 프로젝트를 만들때 생성되는 `package.json` 이다.
```json
"devDependencies": {
  "@sveltejs/vite-plugin-svelte": "^1.0.0-next.30",
  "svelte": "^3.44.0",
  "vite": "^2.9.9"
}
```

# Basics
File extension 은 `.svelte` 로써, `App.svelte` 혹은 `MyComponent.svelte` 로 이름을 지어준다. VS Code 에 있는 `Svelte` extension 도 사용한다.

## Component's State
### Primitives
syntax 는 사실상 HTML 과 같다고 보면 된다. Vue 랑도 꽤나 흡사하지만 JS 코드를 작성하는건 HTML 작성하듯이 한다.
```html
<script>
  let number = 5
  function handleClick() {
    number += 1
  }
</script>

<h1>My number is {number}</h1>
<button on:click={handleClick}>Increment</button>

<style>
h1 {
  background-color: 'red';
}
</style>
```

`number` 처럼 선언한 변수는 아래 html 에서 바로 상태값으로 사용이 가능하고 `Vue` 처럼 reactivity 로도 포함이 되있다.  
### Arrays
상태값을 update 하려면 reassign 을 해야한다. 숫자는 상관이 없지만 배열같은 경우, 다음과 같은 코드는 리렌더링이 되지 않는다.
```js
  let fruits = ['banana', 'apple', 'grape']
  function handleClick() {
    fruits.push('watermelon')
  }
```
새로운 값이 할당이 되야 한다. 방법은 여러가지지만 한가지의 예로 `fruits = [...fruits, 'watermelon']` 이렇게 써야 적용이 된다.

### Objects
`Object` 의 필드값을 할당하면 리렌더링이 된다.
```html
<script>
  let p = { age: 10, name: 'svelte' }
  p.age = 11 // triggers reload
</script>
```
굳이 `object` 자체를 새로 할당안해도 된다. `p = {...p, age: 11}`  
`Array` 도 마찬가지로 `fruits[4] = 'watermelon'` 이렇게 해도 상태값이 변경되면서 렌더링이 다시 된다.

## Props
Props 를 보내려면, 하위 컴포넌트에서 받을 준비를 하면 된다.  

`Child.svelte`:

```html
<script>
  export let num = 0
</script>
<p>num: {num}</p>
```

`Parent.svelte`:
```html
<script>
  import Child from './Child.svelte'
</script>
<Child num={55}/>
<Child />
```
위는 `num: 55`, 아래는 `num: 0` 로 렌더링이 된다.

# Control Flow
`if` 와 `for` loop 들을 어떻게 쓰는지 간단하게 작성해보려 한다.
## If
```html
<script>
  let number = 5
</script>
{#if number < 3}
  <p>Too low</p>
{:else if number < 5}
  <p>Just right</p>
{:else}
  <p>Too high</p>
{/if}
```

## For
```html
<script>
  let fruits = ['apple', 'banana', 'watermelon']
</script>
<ul>
  [#each fruits as fruit (fruit)]
    <li>fruit: {fruit}</li>
  [:each]
</ul>
```

# Async
`svelte` 에 대한 이해가 깊진 않지만, 지금까지 본 `svelte` 기능중에 가장 멋있다고 생각되는 기능이다. 바로 `promise` 에 대한 처리 및 렌더링이다.
```js
<script>
async function getNumber() {
  const res = await fetch(url)
  const text = await res.text()
  if (res.ok) {
    return text
  } else {
    throw new Error(text)
  }
}
let promise = getNumber()
</script>

<button on:click={getNumber}>Click</button>
{#await promise}
  <p>Loading...</p>
{:then text}
  <div>text: {text}</div>
{:catch err}
  <div style="color: red">{err.message}</div>
{/await}
```
아직 더 써봐야 이게 유용할지 안할지 알겠지만, 처음 접했을땐 정말 멋있는 기능인것 같다.

# Event
위에 예시들에 나온것처럼 `on:click` 을 이용하면 된다. 다른 이벤트도 사용할 수 있다. `on:mousemove`, `on:blur` 등등...  
실제 개발을 하다보면 `component` 에서 생성하는 custom event 들이 생기는데, `svelte` 에서 이거 역시 처리를 잘 하는것 같다고 느꼈다.  
우선 `Inner.svelte` 에서 이벤트를 상위 컴포넌트로 보낼때 다음과 같이 작성한다.
```html title="Inner.svelte"
<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  function dispatchEvent() {
    dispatch('someEvent', {
      age: 12,
      name: 'John'
    })
  }
</script>
<button on:click={dispatchEvent}>dispatch event</button>
```
그 다음, `Outer.svelte` 에서 해당 데이터는 다음과 같이 불러올 수 있다.
```html
<script>
  import Inner from './Inner.svelte'
  let age = 0
  let name = ''
  function handleEvent(event) {
    age = event.detail.age
    name = event.detail.name
  }
</script>
<span>{name} is {age} years old.</span>
<Inner on:someEvent={handleEvent} />
```
`event.detail` 객체가 하위 컴포넌트에서 보내주는 param 이다.

만약, 이 이벤트를 `Outer.svelte` 에서 그 상위로 보내고 싶으면 아주 심플하게 처리가 가능하다.
```html
<script>
  import Inner from './Inner.svelte'
</script>
<Inner on:someEvent />
```
이러면 `Outer.svelte` 의 상위인, `App.svelte` 에서도 이벤트를 확인할 수 있다.
```html
<script>
  import Outer from './Outer.svelte'
  function someHandler(e) {
    // ...
  }
<script>
<Outer on:someEvent={someHandler} />
```

# Conclusion
상당히 재밌어 보이는 `svelte` 의 기본 syntax 를 탐구해보았다. vanilla HTML/JS 로 compile 되는게 너무 매력적이고 개발하기가 쉬워보여서 계속 탐구를 할 예정이다.  
다음글은 `lifecycle`, `binding`, 그리고 `store` 중 한개 혹은 여러개를 탐구해볼 예정이다.