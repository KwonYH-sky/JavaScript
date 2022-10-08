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
 */