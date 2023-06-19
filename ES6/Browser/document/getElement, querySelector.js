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

/** querySelectorAll
 * elem.querySelectorAll(css)은 다재다능한 요소 검색 메서드이다.
 * 이 메서드는 elem의 자식 요소 중 주어진 CSS 선택자에 대응하는 요소 모두를 반환한다.
 * 
 * 아래 예시는 마지막 <li>요소 모두를 반환한다.
<ul>
  <li>1-1</li>
  <li>1-2</li>
</ul>
<ul>
  <li>2-1</li>
  <li>2-2</li>
</ul>
<script>
  let elements = document.querySelectorAll('ul > li:last-child');

  for (let elem of elements) {
    alert(elem.innerHTML); "1-2", "2-2"
  }
</script>
 * querySelectorAll은 CSS 선택자를 활용할 수 있다는 점에 아주 유용하다.
 */

/* i) 가상 클래스도 사용할 수 있다.
 * querySelectorAll에는 :hover나 :active 같은 CSS 선택자의 가상 클래스(pseudo-class)도 사용할 수 있다.
 * document.querySelectorAll(':hover')을 사용하면 마우스 포인터가 위에 있는(hover 상태인) 요소 모두를 담은 컬렉션이 반환된다.
 * 이때 컬렉션은 DOM 트리 최상단에 위치한 <html>부터 가장 하단의 요소 순으로 채워진다.
 */

/** querySelector
 * elem.querySelector(css)는 주어진 CSS 선택자에 대응하는 요소 중 첫 번째 요소를 반환한다.
 * 
 * elem.querySelectorAll(css)[0]과 동일하다. 
 * elem.querySelectorAll[0]은 선택자에 해당하는 모든 요소를 검색해 첫 번째 요소만을 반환하고,
 * elem.querySelector는 해당하는 요소를 찾으면 검색을 멈춘다는 점에서 차이가 있다. elem.querySelector가 더 빠른 이유이기도 하다.
 * querySelector는 querySelectorAll에 비해 코드의 길이가 짧다는 장점도 있다.
 */

/** matches
 * 앞서 언급한 모든 메서드는 DOM 검색에 쓰인다.
 * elem.matches(css)는 DOM을 검색하는 일이 아닌 조금 다른 일을 한다.
 * 이 메서드는 요소 elem이 주어진 CSS 선택자와 일치하는지 여부를 판단해준다. 일치한다면 true, 아니라면 false를 반환한다.
 * 요소가 담겨있는 배열 등을 순회해 원하는 요소만 걸러내고자 할 때 유용하다.
 * 
 * 예시
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // document.body.children이 아니더라도 컬렉션이라면 이 메서드를 적용할 수 있다.
  for (let elem of document.body.children) {
    if (elem.matches('a[href$="zip"]')) {
      alert("주어진 CSS 선택자와 일치하는 요소: " + elem.href );
    }
  }
</script>
 */

/** closest
 * 부모 요소, 부모 요소의 부모 요소 등 DOM 트리에서 특정 요소의 상위에 있는 요소들은 조상(ancestor) 요소라고 한다.
 * 메서드 elem.closest(css)는 elem 자기 자신을 포함하여 CSS 선택자와 일치하는 가장 가까운 조상 요소를 찾을 수 있게 도와준다.
 * 
 * closest 메서드는 해당 요소부터 시작해 DOM 트리을 한 단계씩 거슬러 올라가면서 원하는 요소를 찾는다.
 * CSS 선택자와 일치하는 요소를 찾으면, 검색을 중단하고 해당 요소를 반환한다.
 * 
 * 예시:
<h1>목차</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">1장</li>
    <li class="chapter">2장</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('.h1')); // null(h1은 li의 조상 요소가 아님)
</script>
 */

/** getElementsBy*
 * 태그나 클래스 등을 이용해 원하는 노드를 찾아주는 메서드도 있다.
 * querySelector를 이용하는 게 더 편리하고 문법도 짧아서, 요즘은 이런 메서드들은 잘 쓰진 않는다.
 * 하지만 오래된 스크립트에서 사용할 수 있으니 아래 메서드들을 알아두자.
  * elem.getElementsByTagName(tag) - 주어진 태그에 해당하는 요소를 찾고, 대응하는 요소를 담은 컬렉션을 반환한다.
      매개변수 tag에 "*"이 들어가면, '모든 태그'가 검색된다.
  * elem.getElementsByClassName(className) - class 속성값을 기준으로 요소를 찾고, 대응하는 요소를 담은 컬렉션을 반환한ㄴ다.
  * document.getElementsByName(name) - 아주 드물게 쓰이는 메서드로, 문서 전체를 대상으로 검색을 수행한다. 
      검색 기준은 name 속성값이고, 이 메서드 역시 검색 결과를 담은 컬렉션을 반환한다.
 */

// 예시:
// 문서 내 모든 div를 얻는다.
let divs = document.getElementsByTagName('div');
