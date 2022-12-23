var subClass = function () {
    var F = function () { };

    var subClass = function subClass(obj) {
        var parent = this === window ? Function : this;  // Node.js의 경우에는 global을 사용한다.
        var child = function () {
            var _paremt = child.parent_constructor;
            if (_paremt && _paremt !== Function) { // 현재 클래스의 부모 생성자가 있으면 그 함수를 호출한다. 다만 부모가 Function인 경우는 퇴상위 클래스에 도달 했으므로 실행하지 않는다.
                _paremt.apply(this, arguments); // 부모 함수의 재귀적 호출
            }
            if (child.prototype.hasOwnProperty("_init")) {
                child.prototype._init.apply(this, arguments);
            }
        };

        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
        child.parent = parent.prototype;
        child.parent_constructor = parent;
        child.subClass = arguments.callee;

        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                child.prototype[i] = obj[i];
            }
        }
        return child;
    }
    return subClass;
}();

var person = function () {
    var name = undefined;

    return {
        _init: function (arg) {
            name = arg ? arg : "zzoon";
        },
        getName: function () {
            return name;
        },
        setName: function (arg) {
            name = arg;
        }
    };
};

Person = subClass(person());
var iamhjoo = new Person("iamhjoo");
console.log(iamhjoo.getName());

Student = Person.subClass();
var student = new Student("student");
console.log(student.getName());