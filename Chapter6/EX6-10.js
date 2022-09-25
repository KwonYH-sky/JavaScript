var Person = function (arg) {
    var name = arg ? arg : "zzoon";

    return {
        getName: function () {
            return name;
        },
        setName: function (arg) {
            name = arg;
        }
    };
};

var me = Person(); /* or var me = new Person();*/
console.log(me.getName());

/**
 * Person 함수를 호출하여 객체를 반환받는다. 
 * 객체에는 Person 함수의 private 멤버에 접근 할 수 있는 메소드들이 담겨있음
 * 여러 유명 자바스크립트 라이브러리에서 볼 수 있는 구조
 * 다만 private 멤버가 객체나 배열일시 얕은 복사로 참조만 반환함으로 쉽게 접근 가능
 */