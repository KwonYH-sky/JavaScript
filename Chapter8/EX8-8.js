// jQuery 1.0 소스 코드 (라인 14 ~ 53)

// jQuery 함수 객체
function jQuery(a, c) {

    // 인자 a가 함수이고, jQuery.fn.ready가 참이면?
    if (a && a.constructor == Function && jQuery.fn.ready)
        return jQuery(document).ready(a);

    a = a || jQuery.context || document;

    // a가 jquery 프로퍼티를 가진 객체라면>
    if (a.jquery)
        return $(jQuery.merge(a, []));

    // 인자 c가 jquery 프로퍼티를 가진 객체라면?
    if (c && c.jquery)
        return $(c).find(a);

    // this 값을 살펴서, 현재 jQuery() 함수 형태로 호출됐는지 확인
    if (window == this)
        return new jQuery(a, c);

    // Handle HTML strings
    var m = /^[^<]*(<.+>)[^>]*$/.exec(a);
    if (m) a = jQuery.clean([m[1]]);

    // Watch for when an array is passed in
    this.get(a.constructor == Array || a.length && !a.nodeType && a[0] != undefined && a[0].nodeType ?
        // Assume that it is an array of DOM Elements
        jQuery.merge(a, []) :

        // Find the matching elements and save them for later
        jQuery.find(a, c));

    // See if an extra function was provided
    var fn = arguments[arguments.length - 1];

    // If so, execute it in context
    if (fn && fn.constructor == Function)
        this.each(fn);
}

/**
 * $는 jQuery() 함수를 참조함므로 $("#myDiv")는 jQuery(#myDiv) 함수 호출을 의미
 * a는 "#myDiv"이므로 생성자는 String이다.
 * this 값을 확인해서 jQuery()가 어떤 형태로 호출되었는지 체크한다. 
 * EX8-7에서 $("#myDiv")은 함수 호출 형태이므로 this는 window에 바인딩되어 생성자 함수 형태로 다시 호출
 * 자바스크립트에서 슬래시(/)는 정규표현식 리터럴를 만드는 기호이다.
 * 즉 /로 둘러싸인 부분은 정규표현식 객체로 생성된다.
 * 
 * regex.exec(string) 메서드
 * 정규표현식 객체의 exec(string) 메서드는 인자로 받은 string이 정규표현식에 일치하는지
 * 체크하고, 일치할 경우 배열을 반환한다.
 * 반환된 배열의 첫번째 요소(인덱스 0)은 일치하는 문자열을 포함하고, 두 번째 요서(인덱스 1)부터는
 * 캡처된 텍스트를 순서대로 포함한다. 일치하지 않으면 null을 반환한다.
 * 
 * exec() 메서드에 '#myDiv' 문자열이 인자로 넘겨진다. 이 문자열에는 <> 태그 형태의 문자열이
 * 포함되어 있지 않으므로 앞서 설명한 ^[^<]*(<.+>)[^>]*$ 정규표현식에 일치하지 않는다.
 * 그러므로 exec() 메서드의 실행결과는 null
 * 변수 m은 null이 저장되어 있으므로 if문 이하는 처리되지 않는다.
 * 
 * this.get() 메서드의 호풀은 전체적으로 ? 삼항 연산자 형태이다. 
 * true 면 jQuery.merge() 메서드 호출
 * false이면 jQuery.find() 메서드가 호출
 * 
 * 종합적으로 false 이므로 jQuery.find(a,c)문 실행
 */