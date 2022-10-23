/**
 * jQuery.find()는 jQuery 함수 객체 내에 포함된 메서드로서, 
 * jQuery의 셀렉터 기능을 처리하는 중요한 함수이다.
 */
// jQuery 1.0 소스코드 (라인 526 ~ 612)
find: function (t, context) {
    // Make sure that the context is a DOM Element
    if (context && context.nodeType == undefined)
        context = null;

    // Set the correct context (if none is provided)
    context = context || jQuery.context || document;

    if (t.constructor != String) return [t];

    if (!t.indexOf("//")) {
        context = context.documentElement;
        t = t.substr(2, t.length);
    } else if (!t.indexOf("/")) {
        context = context.documentElement;
        t = t.substr(1, t.length);
        // FIX Assume the root element is right :(
        if (t.indexOf("/") >= 1)
            t = t.substr(t.indexOf("/"), t.length);
    }

    var ret = [context];
    var done = [];
    var last = null;

    while (t.length > 0 && last != t) {
        var r = [];
        last = t;

        t = jQuery.trim(t).replace(/^\/\//i, "");

        var foundToken = false;

        for (var i = 0; i < jQuery.token.length; i += 2) {
            var re = new RegExp("^(" + jQuery.token[i] + ")");
            var m = re.exec(t);

            if (m) {
                r = ret = jQuery.map(ret, jQuery.token[i + 1]);
                t = jQuery.trim(t.replace(re, ""));
                foundToken = true;
            }
        }

        if (!foundToken) {
            if (!t.indexOf(",") || !t.indexOf("|")) {
                if (ret[0] == context) ret.shift();
                done = jQuery.merge(done, ret);
                r = ret = [context];
                t = " " + t.substr(1, t.length);
            } else {
                var re2 = /^([#.]?)([a-z0-9\\*_-]*)/i;
                var m = re2.exec(t);

                if (m[1] == "#") {
                    // Ummm, should make this work in all XML docs
                    var oid = document.getElementById(m[2]);
                    r = ret = oid ? [oid] : [];
                    t = t.replace(re2, "");
                } else {
                    if (!m[2] || m[1] == ".") m[2] = "*";

                    for (var i = 0; i < ret.length; i++)
                        r = jQuery.merge(r,
                            m[2] == "*" ?
                                jQuery.getAll(ret[i]) :
                                ret[i].getElementsByTagName(m[2])
                        );
                }
            }
        }

        if (t) {
            var val = jQuery.filter(t, r);
            ret = r = val.r;
            t = jQuery.trim(val.t);
        }
    }

    if (ret && ret[0] == context) ret.shift();
    done = jQuery.merge(done, ret);

    return done;
},

/**
 * context 인자가 undefined이면 jQuery.context 값을 context 인자에 재할당하고,
 * false이면 document를 context 변수에 저장한다. (document는 DOM 객체의 일종 HTML 문서의 모든 구성요소를 포함)
 * context 와 jQuery.context 모두 undefined이므로 context에는 document객체가 할당
 * 
 * t.indexOf("//") 와 t.indexOf("/")는 모두 -1이 반환
 * 그러므로 !.indexOf("//") 와 !t.indexOf("/")은 모두 false가 되므로 if문 이하는 실행 안됨
 * (-1 은 true 취급이므로 !(부정)연산자가 붙으면 false)
 * 
 * jQuery.trim(t) 메서드 호출로 t 문자열의 양 끝 공백 문자들을 제거한 다음, 
 * 문자열의 replace() 메서드를 연속해서 호출
 */