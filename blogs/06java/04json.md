---
sidebar_position: 4
title: JSON Parse
---

Last updated: 2022/01/10 Mon

## Introduction

JavaScript 에선 JSON 을 읽고 만드는게 참 쉽다. `JSON.parse(jsonString)` 혹은 `JSON.stringify(jsonObject)` 만하면 알아서 읽어준다. 하지만, Java 는 그렇게 친절한 언어는 아니다. 그래서, Java 에서 json 을 읽는 방법이 궁금해서 찾아보게 되었다.

## org.fasterxml.jackson.core

JSON 관련 데이터를 처리하는데 많이 쓰이는 라이브러리 이다. 세팅은 maven 을 이용했다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.pewpew</groupId>
    <artifactId>json-parsing-java</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>2.13.1</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.13.1</version>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>RELEASE</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>5.8.2</version>
            <scope>compile</scope>
        </dependency>
    </dependencies>
    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
    </properties>
</project>
```

`{"title":"TypeScript > JavaScript"}` 를 읽어들이는걸 예제로 해보았다. 언급됬듯이 `JSON.parse(jsonString)` 을 쓸 수가 없다.

```java
public class Json {
  private static ObjectMapper objectMapper = new ObjectMapper();

  public static JsonNode parse(String src) {
    objectMapper.readTree(src);
  }
}
```

JSON 은 트리 형식으로 생각할 수 있다. 적어도 jackson 라이브러리를 만든 사람들은 그렇게 생각을 했다. JsonNode 는 다음과 같이 사용할 수 있다.

```java
// Main.java
String simpleTestJson = "{\"title\":\"TypeScript > JavaScript\"}";
JsonNode node = objectMapper.readTree(simpleTestJson);
node.get("title").asText(); // "TypeScript > JavaScript"
```

여기까진 일단 좋다. 하지만, 이름처럼 object 에 mapping 을 하려면 이거론 부족하다. 일단, JSON object 객체를 정의한다.

```java
class MyJsonObject {
  public String title;
}
```

그 후에, 이제 mapping 할 클래스를 받아들일 함수를 준비한다.

```java title='Json'
class Json {
  ...
  public static <A> A fromJson(JsonNode node, Class<A> aClass) {
    return objectMapper.treeToValue(node, aClass);
  }
}
```

이걸 이용해 mapping 을 적용한다.

```java
// Main.java
String simpleTestJson = "{\"title\":\"TypeScript > JavaScript\"}";
JsonNode node = objectMapper.readTree(simpleTestJson);
MyJsonObject myJsonObject = Json.fromJson(node, MyJsonObject.class);
myJsonObject.title; // "TypeScript > JavaScript"
```

## Conclusion

여기서 Java 에서 JSON 을 읽는 아주 제일 간단한 방법을 알아보았다. 하면서 느낀건, boilerplate code 가 JavaScript 에 비해 상당히 많다. 혼자 진행해보는 이런 tutorial 이나 프로젝트에선 매우 귀찮게 느껴진다. 하지만, 여러 개발자들과 일을 하는 환경에선 좋을 수도 있겠다는 생각이 든다. (라고 세뇌를 한다)  
일단은 여기까지 써보겠다. ObjectMapper 를 configure 할 수 있는 세팅도 많은데 차차 탐험해볼 예정이다.
