/** getElement*, querySelect*로 요소 검색하기
 * 요소들이 가까이 붙어있다면 DOM 탐색프로퍼티를 사용해 목표 요소에 쉽게 접근할 수 있다.
 * 그런데, 요소들이 가까이 붙어있지 않은 경우도 있다.
 * 상대 위치를 이용하지 않으면서 웹 페이지 내에서 원하는 요소 노드에 접근하는 방법을 알아보자.
 */

/** document.getElementById 혹은 id를 사용해 요소를 검색하기
 * 요소에 id 속성이 있으면 위체이 상관없이 메서드 document.getElementById(id)를 이용해 접근할 수 있다.
 * 
 * 예시:
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // 요소 얻기
  let elem = document.getElementById('elem');

  // 배경색 변경하기
  elem.style.background = 'red';
</script>

 * 이에 더하여 id 속성값을 그대로 딴 전역 변수를 이용해 접근할 수 있다.
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
    // 변수 elem은 id 'elem'인 요소를 참조한다.
    elem.style.background = 'red';

    // id가 elem-content인 요소는 중간에 하이픈(-)이 있기 때문에 변수 이름으로 쓸 수 없다.
    // 이럴 땐 대괄호('[...]')를 사용해서 window['elem-content']로 접근하면 된다.
</script>

 * 그런데 이렇게 요소 id를 따서 자동으로 선언된 전역변수는 동일한 이름을 가진 변수가 선언되면 무용지물이 된다.
<div id="elem"></div>

<script>
  let elem = 5; // elem은 더 이상 <div id="elem">를 참조하지 않고 5가 된다.

  alert(elem); // 5
</script>
 */

/* !) id를 따서 만들어진 전역변수를 요소 접근 시 사용하지 말자.
 * id에 대응하는 전역변수는 명세서의 내용을 구현해 만들어진 것으로 표준이긴 하지만 하위 호환성을 위해 남겨둔 동작이다.
 * 
 * 브라우저는 스크립트의 네임스페이스와 DOM의 네임스페이스를 함께 사용할 수 있도록 해서 개발자의 편의를 도모한다.
 * 그런데 이런 방식은 스크립트가 간단할 땐 괜찮지만, 이름이 충돌 가능성이 있기 때문에 추천하는 방식은 아니다.
 * HTML을 보지 않는 상황에서 코드만 보고 변수의 출처를 알기 힘들다는 단점도 있다.
 * 
 * 실무에선 document.getElementById를 사용하자.
 */

/* i) id는 중복되면 안 된다.
 * id는 유일무이해야 한다. 문서 내 요소의 id 속성값은 중복되어선 안된다.
 * 
 * 같은 id를 가진 요소가 여러 개 있으면 document.getElementById같이 id를 이용해 요소를 검색하는 메서드의 동작이 예측 불가능해진다.
 * 검색된 여러 요소 중 어떤 요소를 반환할지 판단하지 못해 임의의 요소가 반환된다.
 * 문서 내 동일 id가 없도록 해 이런 일을 방지하도록 하자.
 */

/* !) anyNode.getElementById가 아닌 document.getElementById
 * getElementById는 document 객체를 대상으로 해당 id를 가진 요소 노드를 찾아준다.
 * 문서 노드가 아닌 다른 노드엔 호출할 수 없다.
 */