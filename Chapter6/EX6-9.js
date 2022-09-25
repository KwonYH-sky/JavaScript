var Person = function (arg) {
    var name = arg ? arg : "zzoon";
    this.getName = function () {
        return name;
    }
    this.setName = function (arg) {
        name = arg;
    }
};

var me = new Person();
console.log(me.getName());
me.setName("iamhjoo");
console.log(me.getName());
console.log(me.name);

/**
 * private멤버로 name 선언, public 메서드로 getName(), setNate() 선언
 * this 객체의 프로퍼티 선언하면 외부에서 New 키워드로 생성한 객체로 접근 가능(public)
 * var로 선언된 멤버들은 외부에서 접근이 불가능(private)
 * public 메서드가 클로저 역할 하면서 private 멤버에 접근 할 수 있다.
 */