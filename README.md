# [Xcare 애플리케이션 간략 소개 보러 가기](https://github.com/stop77/nest-from-spring/wiki/Xcare-%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EA%B0%84%EB%8B%A8-%EC%86%8C%EA%B0%9C)

## 🖥️ 프로젝트 소개

Spring으로 개발된 Xcare 백엔드 애플리케이션의 일부분만 Nest 버전으로 옮긴 프로젝트입니다. 옮기는 과정 중에 Nest에 맞춘 변경이 상당수 발생하였습니다.

## 🕰️ 개발 기간

- 24.01.12일 - 24.01.17일

## ⚙️ 개발 환경

- TypeScript
- IDE : Visual Studio Code
- Framework : Nest
- Database : MySql
- ORM : TypeOrm

## 📌 보충 설명

- 본 프로젝트는 정상적으로 작동하는 서비스를 위해 제작된 것이 아니라 본 개발자의 Nest와 Typescript에 대한 이해도 평가를 위해 제작된 것임을 알려드립니다.
- 테이블은 TypeOrm을 이용해 CodeFirst로 제작된 것이 아니라, Spring Data로 테이블 생성 후, typeorm-model-generator를 사용해 엔티티 모델을 생성했습니다.
- DB 구조 역시 원래의 Xcare 애플리케이션에서 상당히 축소된 버전입니다. 예를 들어 ProductAlert, ProductSideEffect, ProductFunc의 경우, 각각 Alert, SideEffect, Func 테이블이 존재하며 각각 Product와 다대다 관계를 이루고 있었으나, Nest 버전에서는 단순히 string 값으로만 존재하며, 이를 ProductId와 묶어서 Unique 제약만을 걸어놓았습니다.
- 비공개 처리된 코드들이 존재합니다. 비즈니스 핵심 로직이 수행되는 코드들인데, 이를 공개하는 것은 적절하지 않다고 생각해서 비공개 처리를 했습니다.
- 또한 구현하기 위해 Nest, Typescript와 무관한, 부가적인 작업이 너무 많이 소요되서 생략 처리된 코드들도 존재합니다.
