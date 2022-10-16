// jQuery 1.0 소스 코드 (라인 14 ~ 53)

function jQuery(a, c) {

    // Shortcut for document ready (because $(document).each() is silly)
    if (a && a.constructor == Function && jQuery.fn.ready)
        return jQuery(document).ready(a);

    // Make sure that a selection was provided
    a = a || jQuery.context || document;

    // Watch for when a jQuery object is passed as the selector
    if (a.jquery)
        return $(jQuery.merge(a, []));

    // Watch for when a jQuery object is passed at the context
    if (c && c.jquery)
        return $(c).find(a);

    // If the context is global, return a new object
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
 * jQuery 라이브러리는 jQuery() 함수 정의 부터 시작
 *  new 연산자를 이용해 jQuery 객체를 생성하는 기능이다.
 */