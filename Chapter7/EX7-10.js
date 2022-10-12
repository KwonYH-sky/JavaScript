/*
 * 래퍼(wrapper)
 * 특정 함수를 자신의 함수로 덮아쓰는 것을 말함
 * 원래 함수 기능을 잃어버리지 않는 상태로 자신의 로직을 수행할 수 있어야함.
 * 다향성(polymorphism)을 위해 쓰는 오버라이드(override)와 유사함
 */


function wrap(object, method, wrapper) {
    var fn = object[method];
    return object[method] = function () {
        return wrapper.apply(this, [fn].concat(
            // return wrapper.apply(this, [fn.bind(this)].concat(
            Array.prototype.slice.call(arguments)));
    };
}

Function.prototype.original = function (value) {
    this.value = value;
    console.log("value : " + this.value);
}

var mywrap = wrap(Function.prototype, "original", function (orig_func, value) {
    this.value = 20;
    orig_func(value);
    console.log("wrapper value : " + this.value);
});

var obj = new mywrap("zzoon");
// value : zzoon
// wrapper value : 20

/**
 * Function.prototype에 original 함수을 덮어쓰기 위해 wrap함수를 호출
 * 세번째 인자로 넘신 자신의 익명함수를 Function.prototype.original에 덮어쓰려한다.
 * 자신의 익명 함수 첫 번째 인자로 원래 함수의 참조를 받을 수 있다. 이 참조로 원래 함수를 실행 로직 수행 할 수 있다.
 */
