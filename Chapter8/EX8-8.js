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
 */