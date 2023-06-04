/** DOM 탐색하기
 * DOM을 이용하면 요소와 요소의 콘텐츠에 무엇이든 할 수 있다. 
 * 하지만 무언가를 하기 전엔, 당연히 조작하고자 하는 DOM 객체에 접근하는 것이 선행되어야 한다.
 * 
 * DOM에 수행하는 모든 연산은 `document` 객체에서 시작한다. `document` 객체는 DOM에 접근하기 위한 '진입점'이다.
 * 진입점을 통과하면 어떤 노드에도 접근할 수 있다.
 */

/** 트리 상단의 documentElement와 body
 * DOM 트리 상단의 노드들은 `document`가 제공하는 프로퍼티를 사용해 접근할 수 있다.
 * 
 * <html> = document.documentElement
 * document를 제외하고 DOM 트리 꼭대기에 있는 문서 노드는 <html> 태그에 해당하는 document.documentElement이다.
 * 
 * <body> = document.body
 * document.body는 <body> 요소에 해당하는 DOM 노드로, 자주 쓰이는 노드 중 하나이다.
 * 
 * <head> = document.head
 * <head> 태그는 document.head로 접근할 수 있다.
 */

/* !) document.body가 null일 수도 있으니 주의하자.
 * 스크립트를 읽는 도중에 존재하지 않는 요소는 스크립트에서 접근할 수 없다.
 * 브라우저가 아직 document.body를 읽지 않았기 때문에 <head>안에 있는 스크립트에선 document.body에 접근하지 못한다.
 * 따라거 아래 예시에서 첫 번째 alert창엔 null이 출력된다.

<html>

<head>
    <script>
        alert( "HEAD: " + document.body ); // null, 아직 <body>에 해당하는 노드가 생성되지 않았음
    </script>
</head>

<body>

    <script>
        alert( "BODY: " + document.body ); // HTMLBodyElement, 지금은 노드가 존재하므로 읽을 수 있음
    </script>
</body>
</html>

 */

/* i) DOM의 나라에서 null은 '존재하지 않음'을 의미한다.
 * DOM에서 null 값은 '존재하지 않음'이나 '해당하는 노드가 없음'을 의미한다.
 */

/** childNodes, firstChild, lastChild로 자식 노드 탐색하기
 * 앞으로 사용할 두 가지 용어를 먼저 정의하자.
    * 자식 노드(child node, children)는 바로 아래의 자식 요소를 나타낸다. 
        자식 노드는 부모 노드의 바로 아래에서 중첩 관계를 만든다. <head>와 <body>는 <html> 요소의 자식 노드이다.
    * 후손 노드(descendants)는 중첩 관계에 있는 모든 요소를 의미한다. 자식 노드, 자식 노드의 모든 자식 노드 등이 후손 노드가 된다.
 * 
 * 아래 예시에서 <body>는 <div>와 <ul>, 몇 개의 빈 텍스트 노드를 자식 노드로 갖는다.
<html>
  <body>
    <div>시작</div>

    <ul>
      <li>
        <b>항목</b>
      </li>
    </ul>
  </body>
</html>

 * <div>나 <ul>같은 <body>의 자식 요소뿐만 아니라 
 * <ul>의 자식 노드인 <li>와 <b>같은 더 깊은 곳에 있는 중첩 요소도 <body>의 후손 노드가 된다.
 * 
 * `childNodes` 컬렉션은 텍스트 노드를 포함한 모든 자식 노드를 담고 있다.
 * 아래 예시를 실행하면 document.body의 자식 노드가 출력된다.
 
<html>
  <body>
    <div>시작</div>

    <ul>
      <li>항목</li>
    </ul>

    <div>끝</div>

    <script>
      for (let i = 0; i < document.body.childNodes.length; i++) {
        alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ... , SCRUPT
      }
    </script>
    ...추가 내용...
  </body>
</html>
 * <script> 아래 더 많은 내용(...추가 내용...)이 있지만, 마지막에 SCRIPT가 출력된다.
 * 스크립트 실행 시점엔 브라우저가 추가 내용은 읽지 못한 상태이기 때문에 스크립트 추가 내용을 보지 못해서 이런 결과가 나타난다.
 * 
 * firstChild 와 lastChild 프로퍼티를 이용하면 첫 번째, 마지막 자식 노드에 빠르게 접근할 수 있다.
 * 이 프로퍼티들은 단축키 같은 역할을 한다. 자식 노드가 존재하면 아래 비교문은 항상 참이 된다.
 */
elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
/* 참고로 자식 노드의 존재 여부를 검사할 땐 함수 `elem.hasChildNodes()`를 사용 할 수도 있다. */