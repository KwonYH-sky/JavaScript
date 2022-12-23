function Person(arg) {
    this.name = arg;
}

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
};

Person.method("setName", function (value) {
    this.name = value;
});

Person.method("getName", function () {
    return this.name;
});

function Student(arg) {
}

function F() { };
F.prototype = Person.prototype;
Student.prototype = new F();
Student.prototype.constructor = Student;
Student.super = Person.prototype;

var me = new Student();
me.setName("zzoon");
console.log(me.getName());

/**
 * 프로토타입을 이용한 상속과 유사한 프로토타입 체인닝을 통해 상속
 * 빈 함수 F()을 중재자 역할로 세워 Person의 인스턴스와 Student의 인스턴스를 
 * 서로 독립적으로 만들었다.
 */