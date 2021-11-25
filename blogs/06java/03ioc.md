---
sidebar_position: 3
title: IoC, Dependency Injection
---
Last updated: 2021/11/21 Sun

## Introduction
Inversion of Control 과 Dependenecy Injection 은 Spring Framework 에서 정말 많이 들리는 단어이다. 많이 듣기는 했지만 제대로 이해해보지 못했던것 같아, 책을 ([Expert Spring MVC and Web Flow](https://www.amazon.com/Expert-Spring-MVC-Web-Flow/dp/159059584X/ref=sr_1_1)) 보고 내용을 정리해보려 한다. 오래된 책 (2006) 이긴 하지만, IoC 와 DI 는 그 사이에 변한게 아니다.

## Inversion of Control
IoC 는 DI 보다 더 큰 개념이다. DI 는 IoC 의 한 예제일 뿐이다.  
IoC 는 어떤 객체가 관리하는 분야를 Framework 나 Context 에게 역으로 맡긴다. 본인이 직접 control 하는 걸 그 환경이 control 하게 맡기기 때문에 inversion of control 이라는 용어가 쓰인다.

### Example
어떤 유저가 은행 계좌를 이용하는 프로그램을 생각해보자.
```java
public class BankAccount {
  public void transfer(BigDecimal amount, BankAccount recipient) {
    SecurityManager.hasPermission(this, Permission.TRANSFER,
      SecurityContext.getCurrentUser());
    recipient.deposit(this.withdraw(amount));
  }

  public void closeOut() {
    SecurityManager.hasPermission(this, Permission.CLOSE_OUT,
      SecurityContext.getCurrentUser());
    this.open = false;
  }

  public void changeRates(BigDecimal newRate) {
    SecurityManager.hasPermission(this, Permission.CHANGE_RATES,
      SecurityContext.getCurrentUser());
    this.rate = newRate;
  }
}
```
`SecurityManager.hasPermission()` 이 돈을 보내거나 rate 을 바꾸거나 계좌를 닫을때마다 계속 호출되는 코드를 작성한다. 은행 계좌는 계좌만 다루게 (비즈니스 로직만) 하는것이 제일 좋은 코드이다. `SecurityManager` 에 해당하는 코드는 분리하게 작성하는 게 좋다.
```java
...
public void transfer(BigDecimal amount, BankAccount recipient) {
  recipient.deposit(this.withdraw(amount));
}
```
그럼 authorization 을 어떻게 체크해야 할까? AOP framework (ex. Spring AOP) 를 이용할 수 있다. Spring AOP 는 proxy-based AOP 를 이용한다. proxy 란 Wrapper 객체를 이용해 `SecurityManager` 를 자동으로 호출한다.  
![AOP](/img/spring/aop1.png)  
여기서 Wrapper 객체는 `BankAccountProxy` 이다. `SecurityManager` 에서 체크한 후 `BankAccount` 의 함수를 호출하는 걸 볼 수 있다.  
이런식으로 `BankAccount` 객체 내부에서 authorization 을 제어하는게 아닌, 그 environment 에서 제어를 할 수 있는데 IoC 이다.

## Dependency Injection
Spring 에서 DI 는 알아서 객체를 만들고 (dependency) 필요한 곳에 넣어준다 (injection). 프로그래머가 직접 객체를 생성할 필요가 없게 해준다.  

### Example
두개의 interface 가 있다고 가정해보자. `CashRegister` 는 계산대이고, `PriceMatrix` 는 가격을 찾아보는 interface 이다.
```java
public interface CashRegister {
  public BigDecimal calculateTotalPrice(ShoppingCart cart);
}
```
```java
public interface PriceMatrix {
  public BigDecimal lookupPrice(Item item);
}
```

`CashRegister` 를 클라스를 정의해보면:
```java
public class CashRegisterImpl implements CashRegister {
  private PriceMatrix priceMatrix = new PriceMatrixImpl();
  
  public BigDecimal calculateTotalPrice(ShoppingCart cart) {
    BigDecimal total = new BigDecimal("0.0");
    for (Item item : cart.getItems()) {
      total.add(priceMatrix.lookupPrice(item));
    }
    return total;
  }
}
```
이렇게 했을때 3가지의 단점이 있다.
1. `CashRegisterImpl` 을 생성할때마다 새로운 `PriceMatrixImpl` 까지 생성한다. 이 객체들을 생성할때 많은 자원이 요구되면, 성능이 떨어질 수 있다.
2. `CashRegisterImpl` 은 `PriceMatrixImpl` 의 존재를 알고 두개의 의존성이 높아진다.
3. `2`번 때문에 테스트가 어려워진다.

이를 해결하기 위해 Spring 에 Dependency Injection 이 있다. Constructor-based, 그리고 setter-based 가 있다.
```java
public class CashRegisterImpl implements CashRegister {
  private PriceMatrix priceMatrix;

  public CashRegisterImpl(PriceMatrix priceMatrix) {
    this.priceMatrix = priceMatrix;
  }

  public BigDecimal calculateTotalPrice(ShoppingCart cart) {
    BigDecimal total = new BigDecimal("0.0");
    for (Item item : cart.getItems()) {
      total.add(priceMatrix.lookupPrice(item));
    }
  return total;
  }
}
```
framework 가 `PriceMatrix` 를 implement 한 객체의 reference 를 가지고 있다가 `CashRegisterImpl` 에 패스해준다. 직접 객체를 만들어서 쓰는게 아닌, framework 가 알아서 처리해주는게 IoC 의 핵심이다.

### Testing
위에 있는 `calculateTotalPrice` 를 unit test 한다면 이렇게 할 수 있다.
```java
public void testCalculateTotalPrice() {
  Mock mockPriceMatrix = mock(PriceMatrix.class);
  PriceMatrix priceMatrix = (PriceMatrix) mockPriceMatrix.proxy();
  cashRegister.setPriceMatrix(PriceMatrix);
  // mock object expectations set…
  assertEquals(42.00, cashRegister.calculateTotalPrice(cart));
}
```