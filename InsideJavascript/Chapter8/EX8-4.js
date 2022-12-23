// jQuery 1.0 소스 코드 (라인 266 - 272)
jQuery.extend = jQuery.fn.extend = function (obj, prop) {
    if (!prop) { prop = obj; obj = this; }
    for (var i in prop) obj[i] = prop[i];
    return obj;
};
/**
 * extend() 메서드는 객체의 기능을 추가하는 기능을 한다.
 * 두개의 인자를 받는 경우, 첫 번째 인자로 전달된 obj 객체에
 * 두 번째 인자로 전달된 prop 객체의 모든 프로퍼티를 추가한다.
 * obj 인자 하나만으로 호출 될 경우, 메서드를 호출한 객체(this)에다가 
 * obj인자로 넘긴 객체를 복사 한다.
 */
