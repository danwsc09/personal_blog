---
sidebar_position: 2
title: Methods
---
Last updated: 2022/06/21 Tue

# Introduction
Go 에 나오는 methods 와 interface 들 중 생각나는 부분을 정리해보려 한다.


# Methods
`struct` 에 method 를 정의하려면 `func` keyword 다음에 사용되는 `struct` 이름을 다음과 같이 써준다.
```go
type Vertex struct {
	X, Y float64
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func Abs(v Vertex) {
    return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
    v := Vertex{x: 3.0, y: 4.0}
    v.Scale(10.0)
    fmt.Println(Abs(v)) // 50.0
}
```
## Value vs. Pointer
여기서 차이점이 있다. 만약 `func (v Vertex) Scale(f float64) { ... }` 이렇게 함수가 지정됬다면 위 함수는 `50.0` 이 아닌 `5.0` 을 프린트 할것이다.  
왜 일까? `(v Vertex)` 는 `v` 를 copy 해서 이용한다. `Scale()` 함수가 끝나면 해당 함수 stack 은 사라지고 `v` 도 같이 사라진다. `v` 의 X 와 Y 를 바꿔도 그 복사된 `v` 가 바뀐것이지, 기존의 `v` 객체가 바뀌는게 아니기 때문이다.  
반대로 pointer `(v *Vertex)` 를 이용하면 그 `v` 의 주소를 이용해 `X` 와 `Y` 값을 바로 고치게 된다.  
