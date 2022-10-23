// jQuery.token 배열 (jQuery 1.0 라인 513 ~ 525)
token: [
    "\\.\\.|/\\.\\.", "a.parentNode",
    ">|/", "jQuery.sibling(a.firstChild)",
    "\\+", "jQuery.sibling(a).next",
    "~", function (a) {
        var r = [];
        var s = jQuery.sibling(a);
        if (s.n > 0)
            for (var i = s.n; i < s.length; i++)
                r.push(s[i]);
        return r;
    }
],

/**
 * jQuery.token은 배열 리터럴 방식으로 생성한 배열로서 정규표현식에 해당하는 문자열과
 * 그것에 매핑된 값처럼 두 개의 요소가 하나의 쌍으로 구성되어 있다.
 */