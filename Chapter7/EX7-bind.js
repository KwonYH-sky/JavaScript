Function.prototype.bind = function (thisArg) {
    var fn = this,
        slice = Array.prototype.slice;
    args = slice.call(arguments, 1);
    return function () {
        return fn.apply(thisArg, args.concat(slice.call(arguments)));
    };
}

/**
 * 가장 기본적인 기능만을 구현한 코드
 * 
 * 커링과 같이 사용자가 고정시키고자 하는 인자를 bind() 함수를 호출할 때 인자로 넘겨주고
 * 반환벋은 함수를 호출하면서 나머지 인자를 넣어줄 수 있다.
 * Curry()함수와 다른 점은 함수를 호출할 때 this에 바인딩 시킬 객체를 사용자가 넣어줄 수 있다는 점이다.
 */