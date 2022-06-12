---
sidebar_position: 1
title: Init
---
Last updated: 2022/06/12 Sun

# Introduction
Go 를 쓰면서 간단하게 encounter 하는 syntax 를 정리하려 한다. 이번엔 Go package 단위에서 일어나는 일들에 대해 써보려 한다.


# Constants
`Go` 파일에선 constants 는 compile 될때 생성된다. 따라서, 함수 콜일수는 없고, `number`, `character` (`rune`), `string`, or `boolean` 타입만 가능하다.  
`1 << 3` 은 가능하지만 `math.Sin(math.Pi / 4)` 는 `math.Sin` 이 함수라서, runtime 때 호출이 되기 때문에 안된다.  
  
`iota` 를 이용한 `const` 도 compile time 에 컴파일 된다.
```go
type ByteSize float64

const (
    _ = iota
    KB ByteSize = 1 << (10 * iota)
    MB
)
```

# Variables
`var` 키워드를 이용해서 initialize 할 수 있지만, 꼭 `constant expression` 이 아닌 `general expression` 이어도 되고 이때는 런타임때 compute 된다.
```go
var (
    home = os.Getenv("HOME")
    user = os.Getenv("USER")
    gopath = os.Getenv("GOPATH")
)
```

# Init function
각 `go` 파일에는 `init()` function 을 지정해줄 수 있다. `niladic function` 으로 parameter 를 받지 않는다. `init()` 함수가 여러개여도 상관없다.  
호출되는 순서는:
1. `import` 된 package 들이 initialize 된다.
2. 변수 (`var`) 들이 evaluate 된다.
3. `init()` 이 호출된다.