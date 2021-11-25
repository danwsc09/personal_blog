---
sidebar_position: 2
title: JVM 알아보기
---
Last updated: 2021/11/18 Thurs

## Introduction
Java 컴파일러가 .java 소스코드를 .class 파일로 (bytecode) 로 컴파일을 한다. JVM 은 이 .class 파일들을 실행할때 쓰인다.  
JVM 에는 크게 3가지가 있다.
1. Class loader
2. Runtime data area
3. Execution engine

## Class Loader
Class loader 는 컴파일된 .class 파일들을 메모리에 싣는 역할을 한다. 
1. Loading
2. Linking
3. Initialization

### Loading
3가지 종류의 loader 가 있다.
1. **Bootstrap class loader** - RT.jar (runtime) 파일을 메모리에 로드 한다. 여기엔 아주 기본적인 Java 클라스들이 포함되있다. `java.lang.*` 에 있는 `System` `System.out.println("hello")` 이 이파일에 있다. RT.jar 은 jre/lib 폴더에 있다.  
2. **Extension class loader** - jre/lib/ext 에 있는 .class 파일들을 로드할떄 쓰인다. 예. IBM MQ.jar, OJDBC.jar 
3. **Application class loader** - 우리가 만든 App.java 가 App.class 로 컴파일 되면, 이 App.class 파일들을 메모리에 로드 한다. Command line 에서는 `-cp` 후에 파일명을 넣어서 어느 파일을 실행할지 정할 수 있다.  

### Linking
1. Verify - .class 파일들이 메모리에 로드되면 이 bytecode 들이 제대로 형성되었는지 검토한다 (JVM specification).
2. Prepare - static 변수들이 메모리에 할당되고 기본값을 준다. 예를 들면 `static boolean isHappy = true` 라고 지정되있으면, boolean 의 기본값은 `false` 이기 때문에 여기선 `false` 값을 가진다.
3. Resolve - symbolic reference 가 actual reference 로 replace 된다. 예를 들면, `Bike` 객체가 있고 인스턴스 변수로 `Owner` 가 있다고 가정할때, `Owner` 라는 클라스를 찾지 못하면 에러가 발생한다. 하지만, `Owner` 라는 클라스가 존재하고 찾았다면 계속 진행한다.

### Initialization
모든 static 변수들에게 실제 값을 할당하고 static initializer 가 실행된다.
```java
class Something {
  static int x;
  static {
    x = 32;
  }
  // other methods/constructors
}
```

## Runtime data area
Runtime data area 는 JVM 내부에 있는 메모리로써, .class 파일들이 저장되고 실행된다. 5가지로 나뉘어져 있다.
1. Method Area 
2. Heap Area
3. Stack Memory
4. PC Register
5. Native Method Stack

### 1. Method Area
class 에 관한 데이터가 저장되있다. 예를 들면, static 변수들이 저장되있다.
```java
Class Employee {
  static int count = 0;
}
```
기본적으로 64MB 가 주어진다. 수정될 수 있다. 클라스가 엄청 많아서 메모리가 부족하면 java.lang.OutOfMemoryError 가 발생할 수 있다.

### 2. Heap Area
모든 객체들과 그에 해당하는 변수들이 저장되있다. 예를 들면 `new Employee()` 같은 객체들이 저장된다.

### 3. Stack Memory
3 가지를 할당한다.
1. Local variable - method 내부에서 쓰이는 변수들을 저장한다.
2. Operand stack - method 내부에서 쓰이는 operand 들을 저장한다. `1 + 2` 에서 `1` 과 `2` 는 operand 고 `+` 는 operator 이다.
3. Frame data - Exception 이 발생할 수 있으니, 대비하여 catch 블락에 있는 정보들을 저장한다.

### 4. PC Register
현재 실행되고 있는 instruction 을 저장하고 있다.

### 5. Native Method Stack
Native Method 에 관한 정보를 저장하고 있다. OS 에 의존하는 파일/클라스들을 가지고 있다. 예를 들면 Windows 는 .dll 파일들, Unix 는 .so 혹은 .a 파일들을 다루게 해준다고 한다.

## Execution engine
bytecode 를 machine code 로 바꾸고, 실행을 시키는 엔진이다. 다음 4가지를 포함한다. 
1. Interpreter
2. JIT compiler
3. Garbage collector
4. Java Native Method Interface

### 1. Interpreter
.class 파일들을 읽고 한줄 한줄 실행시킨다.  
문제점은 똑같은 코드를 다시 실행할때 똑같이 한줄씩 실행시키기 때문에 효율성이 떨어진다.

### 2. JIT compiler
같은 코드가 반복되서 실행되면 JIT compiler 는 bytecode 를 native code 로 컴파일 시킨다. 여기서 native code 는 사용되는 컴퓨터의 프로세서가 바로 이해할 수 있는 코드를 말한다. 이걸 하기위해 JIT Compiler 는 다음과 같은 요소들로 구성되어 있다.
1. Intermediate code generator - 말그대로 intermediate code 를 생성한다. native code 로 컴파일 되기 전 모양이다.
2. Code optimizer - intermediate code 를 최적화 시킨다.
3. Target code generator - 위에 만든 intermediate code 를 native code 로 바꾼다.
4. Profiler - hotspot 을 찾는다. 즉, 자주 실행되는 코드들을 감지한다.

### 3. Garbage collector
더이상 안쓰이고 자리만 차지하는 객체들을 메모리에서 없앤다.

### 4. Java Native Method Interface
native library 는 OS 가 제공하는 코드들이다. 주로 C, C++, 그리고 Assembly language 로 되있는 파일들이다. process, file I/O 등을 포함한다.  
이런 native library 들을 쓸 수 있게 해준다.

## Conclusion
JVM 에는 3가지 요소가 있다.  
**Class loader** - bytecode (.class) 파일들을 메모리에 로드한다.  
**Runtime data area** - 실행할 코드들과 프로그램에 쓰이는 데이터들을 저장한다.  
**Execution engine** - 실제로 코드를 실행하는 곳이다.  

출처:
youtube - [BigDataElearning](https://www.youtube.com/watch?v=QHIWkwxs0AI) 