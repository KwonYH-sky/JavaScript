var Person = function (arg) {
    var name = arg ? arg : "zzoon";

    var Func = function () { };
    Func.prototype = {
        getName: function () {
            return name;
        },
        setName: function (arg) {
            name = arg;
        }
    };
    return Func;
}();

var me = new Person();
console.log(me.getName());

/**
 * 즉시 실행 함수에서 반환 되는 Func이 클로저가 되고 
 * 참조하는 name 프로퍼티가 자유 변수가 된다.
 * 즉 name에 접근 할 수 없다.
 */