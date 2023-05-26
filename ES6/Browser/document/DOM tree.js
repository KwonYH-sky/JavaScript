/** DOM 트리
 * HTML을 지탱하는 것은 태그(tag)이다.
 * 문서 객체 모델(DOM)에 따르면, 모든 HTML 태그는 객체이다. 
 * 태그 하나가 감싸고 있는 '자식'태그는 중첩 태그(nested tag)라고 부른다.
 * 태그 내의 문자(text) 역시 객체이다.
 * 
 * 이런 모든 객체는 자바스크립트를 통해 접근할 수 있고, 페이지를 조작할 때 이 객체를 사용한다.
 * `document.body`는 `<body>` 태그를 객체로 나타낸 것이다.
 * 아래 예시를 실행하면 <body>가 3초간 붉은 색으로 변경된다.
 */
document.body.style.background = "red"; // 배경을 붉은 색으로 변경하기

setTimeout(() => document.body.style.background = "", 3000); // 원상태로 복구하기

/* 위 예시에선 document.body의 배경색을 바꾸기 위해 style.background을 사용했는데, 이 외에도 다양한 프로퍼티가 존재한다.
    * innerHTML - 해당 노드의 HTML 콘텐츠
    * offsetWidth - 해당 노드의 너비(픽셀)
    * 기타 등등
 */

/** DOM 예제
 * 간단한 문서를 이용해 DOM 구조에 대해 알아보자

<!DOCTYPE HTML>
<html>
<head>
    <title>사슴에 관하여</title>
</head>
<body>
    사슴에 관한 진실.
</body>
</html>

 * DOM은 HTML을 아래와 같이 태그 트리 구조로 표현한다.

 * HTML
    * HEAD
        #text ↵␣␣␣␣
        * TITLE
            #text 사슴에 관하여
        #text ↵␣␣
    #text ↵␣␣
    * BODY
        #text ↵␣␣사슴에 관한 진실.

 * 트리에 있는 노드는 모두 객체이다.
 * 태그는 요소 노드(element node) (혹은 그냥 요소)이고, 트리 구조를 구성한다. <html>은 루트 노드가 되고,
 * <head>와 <body>는 '루트 노드의 자식'이 된다.
 * 
 * 요소 내의 문자는 텍스트(text) 노드가 된다. 텍스트 노드는 문자열만 담는다. 
 * 자식 노드를 가질 수 없고, 트리의 끝에서 잎 노드(leaf node)가 된다.
 * 
 * <title>태그는 "사슴에 관하여"라는 텍스트 노드를 자식을 갖는다.
 * 
 * 택스트 노드에 있는 특수문자를 눈여겨보자.
    * 새 줄(newilne):`↵`(자바스크립트에선 `\n`로 표시)
    * 공백(space): `␣`
 * 새 줄(newilne)과 공백(space)은 글자나 숫자처럼 항상 유효한 문자로 취급된다.
 * 따라서 이 두 특수문자는 텍스트 노드가 되고, DOM의 일부가 된다.
 * 위 HTML 문서를 보면 <head>와 <title> 사이에 새 줄과 약간의 공백이 있는 것을 볼 수 있는데, 이런 특수문자 역시 #text 노드가 된다.
 */
