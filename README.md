# Calculator with JavaScript

생성자 함수로 객체 생성하여 각 메소드 사용으로 변수 사용를 간편하게 하고 계산 함수를 만들어 기본 계산기를 만들어 보았습니다.

## `class Screen`

#### 화면출력 관리 생성자 함수

```javascript
class Screen {
  constructor(progress, result) {}

  proValue() {
    return this.progress.textContent;
  }

  resValue() {
    return this.result.textContent;
  }

  valueChange(value, screen = "result") {}

  screen_clear(chk) {}
  screenChk() {}
}
```

- proValue & resValue : 화면상 출력값을 **가져오기** 위한 메소드
- valueChange () : 화면상 출력값을 **바꾸기** 위한 메소드
- screen_clear () : 화면 상 출력값을 **지우기** 위한 메소드

---

## Updating....
