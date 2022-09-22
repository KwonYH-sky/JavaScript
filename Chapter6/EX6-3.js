Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
}

function Person(arg) {
    this.name = arg;
}

Person.method("setName", function (value) {
    this.name = value;
});

Person.method("getName", function () {
    return this.name;
});

var me = new Person("me");
var you = new Person("you");
console.log(me.getName());
console.log(you.getName());

/**
 * 더글라스 크락포드는 위와 같은 방법으로 메소드 정의하는 것을 추천한다.
 */