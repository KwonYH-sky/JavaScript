function Person(arg) {
    this.name = arg;
}

Person.prototype.getName = function () {
    return this.name;
};

Person.prototype.setName = function (value) {
    this.name = value;
};

var me = new Person('me');
var you = new Person('you');
console.log(me.getName());
console.log(you.getName());

/**
 * 생성자 함수 프로퍼티를 프로토타입 체이닝을 통해 함수 호출함
 */