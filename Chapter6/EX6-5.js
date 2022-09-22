var person = {
    name: "zzoon",
    getName: function () {
        return this.name;
    },
    setName: function (value) {
        this.name = value;
    }
};

function create_object(o) {
    function F() { };
    F.prototype = o;
    return new F();
}

var student = create_object(person);

student.setName("me");
console.log(student.getName());

student.setAge = function (age) {
    this.age = age;
}
student.getAge = function () {
    return this.age;
}
student.setAge(17);
console.log(student.getAge());

/**
 * 클래스에 해당하는 생성자 함수를 만들지 않고,
 * 그 클래스의 인스턴스를 따로 생성하지 않아도 프로토타입 체인으로 상속를 구현
 */