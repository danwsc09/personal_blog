---
sidebar_position: 1
title: hashCode(), equals() in Java
---
Last updated: 2021/11/15 Mon

## 목적

`equals()`: 두개의 객체의 내용이 같은지 테스트  
`hashCode()`: 두 객체가 같은 객체인지 테스트  

더 자세히 알아보기 위해 객체를 하나 설정한다.
```java
class User {
  String name;
  public User(String name) {this.name = name;}
}
```

## equals()

```java
public static void main(String[] args) {
  User u1 = new User('a');
  User u2 = new User('a');
  System.out.println(u1.equals(u2));
}
```

결과는 `false` 가 나온다. 기본적으로 Object 의 equals() 는 `==` 를 이용하기 때문이다.  
```java
@Override
public boolean equals(Object obj) {
  return this == obj;
}
```
하지만, 이걸 바꿀 수 있다.
```java
@Override
public boolean equals(Object obj) {
  if (obj == null) return false;

  if (this.getClass() != obj.getClass()) return false;

  if (this == obj) return true;

  User that = (User) obj;
  return this.name.equals(that.name);
}
```
바꾼 후 실행하면, `u1.equals(u2)` 는 `true` 를 리턴한다.

## hashCode()
`hashCode()` 는 HashMap 같은 자료구조에 키를 결정할때 호출되는 함수이다.  
```java
public static void main(String[] args) {
  User u1 = new User('a');
  User u2 = new User('a');
  Map<User, Integer> map = new HashMap<>();
  map.put(u1, 1);
  map.put(u2, 2);
  System.out.println(map.size());
}
...
class User {
  ...
  @Override
  public int hashCode() {
    System.out.println("calling hash from " + this.name);
    return 1;
  }
}
```
이렇게 호출했을때  
```
calling hash from a
calling hash from a
1
```
이렇게 output 이 나온다. size 가 1 인 이유는 key 값이 (`hashCode()`) 같을 뿐 아니라, 아까 `equals()` 에서 이름만 같으면 `true` 를 리턴하게 했기 때문이다. 즉, key 값이 같고, `equals()` 가 같으면 똑같은 object 로 취급이 된다.  
하지만 `equals()` 를 다시 `return this == obj` 으로 바꾸고 호출하면:  
```
calling hash from a
calling hash from a
2
```

## 규칙
1. `hashCode()` 가 같은 object 에 여러번 호출이 된다면, 항상 같은 값을 리턴해야 한다. 단, `equals()` 도 변경되지 않았을 때 이다.  
2. 두개의 객체가 `equals()` 를 호출했을때 같으면, `hashCode()` 를 호출 할 때도 같아야 한다.
3. 두개의 객체의 `equals()` 가 같지 않다고 해서 `hashCode()` 가 꼭 다를 필요는 없다. 하지만, `equals()` 가 다른데 `hashCode()` 가 같다면 hash table 의 성능이 안좋아 질 수 있다.

[Baeldung](https://www.baeldung.com/java-hashcode)
[블로그](https://nesoy.github.io/articles/2018-06/Java-equals-hashcode)