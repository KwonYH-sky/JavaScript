function Person(arg) {
    this.name = arg;

    this.getName = function () {
        return this.name;
    };

    this.setName = function (value) {
        this.name = value;
    };
}

var me = new Person("zzoon");
console.log(me.getName());

me.setName("iamhjoo");
console.log(me.getName());

/*
생성자 함수를 통해 객체를 생성함
하지만 객체 생성마다 중복함수가 계속 할당됨으로 메모리상 비효율적이다.
*/