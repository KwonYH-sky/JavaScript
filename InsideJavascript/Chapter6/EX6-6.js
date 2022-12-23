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

function extend(obj, prop) {
    if (!prop) { prop = obj; obj = this }
    for (var i in prop) obj[i] = prop[i];
    return obj;
}

var student = create_object(person);
var added = {
    setAge: function (age) {
        this.age = age;
    },
    getAge: function () {
        return this.age;
    }
};

extend(student, added);

student.setAge(25);
console.log(student.getAge());

/**
 * 앞선 프로토타입 기반 상속 후 
 * jQuery 1.0 extend()함수(는 객체-배열,함수포함-은 얉은 복사함)를 구현하여
 * person객체를 상속하는 student객체에 함수를 추가함
 */