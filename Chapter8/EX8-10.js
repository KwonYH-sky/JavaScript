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
 * 정규표현식 리터럴 /^\/\//i은 문자열이 // 시작하는 지 체크
 * 위의 replace() 메서드는 //로 시작되는 문자열에서 //를 제거한 새로운 문자열을 리턴
 * #myDiv는 글자 양 끝에 공백문자가 없고 //도 없으므로 그대로 '#myDiv'가 t에 저장
 * 
 * for문 내부에서는 jQuery.token 배열의 홀수 번쨰 요소를 이용해서 정규표현식을 생성
 * 이때 자바스크립트 정규표현식 객체 생성자 함수인 RegExp()가 이용
 * RegExp() 생성자는 정규표현식을 문자열 형태의 인자로 받는다.
 * 
 * 4개의 정규표현식 객체에서 각각 exec() 메서드를 호출해서 t 인자로 전달된 문자열이 매칭되는지 체크
 * 
 * 변수 re2에 정규표현식 리터럴 /^([#.]?)([a-z0-9\\*_-]*)/i로 정규표현식 객체를 생성 후
 * 문자열 패턴 매칭을 수행
 * #로 시작하고 알파벳으로 구성된 문자열이므로 정규표현식에 매칭
 * #와 myDiv는 각각 캡처
 * 따라서 var m = re2.exec(t);의 실행결과는 
 * m[0] - '#myDiv'
 * m[1] - '#'
 * m[2] - 'myDiv'
 * 
 * document 객체의 getElementById(id) 메서드는 현재 HTML 페이지의 DOM 요소 중
 * id 인자값과 같은 id값을 가진 DOM 객체를 반환한다.
 * 
 * jQuery.merge()는 두 배열을 합치는 jQuery의 유틸리티 메서드.
 * jQuery.merge(done, ret)에서는 done 배열에 ret배열에 요소를 합친 새로운 배열을
 * 생성 후 리턴한다. 최초에 done 배열은 빈 배열로 초기화된 상태고, ret는 'myDiv'를
 * id로 가지는 DOM객체가 들어있는 배열을 가리키므로 합친 결과는 ret배열과 같고,
 * 이렇게 생성된 배열은 다시 done 변수에 저장된 다음 결과값트로 최종 리턴
 */