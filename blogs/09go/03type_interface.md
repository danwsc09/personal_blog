---
sidebar_position: 2
title: Type and Interface
---
Last updated: 2022/06/23 Thu

# Introduction
Type 과 built-in interface 들에 대해 설명해보려 한다.


## Type
Go 에서는 type conversion 을 안전하게 하는 방법이 있다.  
바로 `a := val.(TYPE)` 이렇게 쓴다.
```go
func main() {
    var i interface{} = "hello"
    s := i.(string)
    fmt.Printf("s: %v\n", s) // "hello"

    s, ok := i.(float64)
    fmt.Printf("s: %v, ok: %v", s, ok) // 0 false
}
```
`i.(string)` 의 리턴값은 string 이다.  
하지만 `i.(float64)` 를 호출하게 되면, 에러가 나게 된다. 정확히는 `panic` 을 하게 된다.  
이를 방지하기 위해, `s, ok := i.(float64)` 이렇게 테스트를 할 수 있다. 장점은 `panic` 을 안하게 되서 에러를 gracefully 하게 핸들할 수 있다.  
만약 타입이 맞지 않는다면 `ok` 는 false 가 나오게 되고, `s` 는 기본 zero 값을 가지게 된다.  
`float64` 에서는 0, `bool` 은 false, `string` 은 empty string 이 나오게 된다.  

이렇게 처리하는건 `map` 에서 value 를 꺼낼때랑 비슷하다.  
```go
myMap := map[string]string{}
myMap["foo"] = "bar"

val, exists := myMap["foo"]
fmt.Println("val, exists:", val, exists) // "bar" true

val, exists = myMap["zzzzz"]
fmt.Println("val, exists:", val, exists) // (nothing) false
```


## Built-in Interface
go 에서 `fmt` 패키지에 built-in interface 가 두개가 있다. `Stringer` 와 `Error` 이다.

### Stringer
`Stringer` 의 interface 는 다음과 같다.
```go
type Stringer interface {
    String() string
}
```

이걸 쓰면 특정 타입을 `print` 할떄 포멧을 할 수 있다.

```go
type Person struct {
    Name string
    Age int
}

func (p Person) String() string {
    return fmt.Sprintf("%v is %v years old.", p.Name, p.Age)
}

func main() {
    p := Person{"James", 12}
    fmt.Println(p) // "James is 12 years old"
}
```

## Error
`Error` interface 는 다음과 같다.
```go
type Error interface {
    Error() string
}
```

이걸 쓰면, `error` 가 났을때 그 error 값을 출력을 포멧할 수 있다.

```go
type MyError struct {
    When time.Time
    What string
}

func (e *MyError) Error() string {
    return fmt.Sprintf("at %v, %s", e.When, e.What)
}

func main() {
    var e error
    myE := &MyError{time.Now(), "it didnt work :("}
    e = myE
    fmt.Println(e)
}
```