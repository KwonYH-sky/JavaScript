function subClass(obj) {
    var parent = this === window ? Function : this;
    var F = function () { };

    var child = function () {
        var _paremt = child.parent;

        if (_paremt && _paremt !== Function) {
            _paremt.apply(this, arguments);
        }

        if (child.prototype._init) {
            child.prototype._init.apply(this, arguments);
        }
    };

    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.parent = parent;
    child.subClass = arguments.callee;

    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            child.prototype[i] = obj[i];
        }
    }

    return child;
}


var person_obj = {
    _init: function () {
        console.log("person init");
    },
    getName: function () {
        return this._name;
    },
    setName: function (name) {
        this._name = name;
    }
};

var student_obj = {
    _init: function () {
        console.log("student init");
    },
    getName: function () {
        return "Student Name: " + this._name;
    }
};

var Person = subClass(person_obj); // Person 클래스 정의
var person = new Person(); // person init 출력
person.setName("zzoon");
console.log(person.getName()); // zzoon

var Student = Person.subClass(student_obj); // Student 클래스 정의
var student = new Student(); // person init, student init 출력
student.setName("iamhjoo");
console.log(student.getName()); // Student Name : iamhjoo

console.log(Person.toString()); // Person이 Function을 상속받는지 확인.

/**
 * 생성자 함수가 호출되는가?
 * 부모의 메서드가 자식 인스턴스에서 호출되는가?
 * 자식 클래스가 확장 가능한가?
 * 최상위 클래스인 Person은 Function을 상속 받는가?
 */