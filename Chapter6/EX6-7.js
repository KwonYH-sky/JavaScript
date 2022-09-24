function Person(arg) {
    this.name = arg;
}

Person.prototype.setName = function (value) {
    this.name = value;
};

Person.prototype.getName = function () {
    return this.name;
};

function Student(arg) {
    Person.apply(this, arguments);
}

var you = new Person("iamhjoo");
Student.prototype = you;

var me = new Student("zzoon");
// me.setName("zzoon");
console.log(me.getName());

/**
 * Student 함수 객체를 만들어 해당 객체의 프로토타입을 Person함수 객체의 인스턴스를 참조
 * 참조하여 Student의 인스턴스는 프로토타입 체이닝을 통해
 * Person의 메소드에 접근 가능하다. 이로 클래스 기반 상속을 구현
 * Student 함수 안에서 새롭게 생성된 객체를 apply 함수의 인자로 넘겨 Person 함수를 실행
 * 이것을 통해 자식 클래스의 인스턴스에 대해서도 부모 클래스의 생성자를 실행시킬 수 있다.
 */