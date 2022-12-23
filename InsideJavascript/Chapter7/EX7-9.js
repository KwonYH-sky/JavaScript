var print_all = function (arg) {
    for (var i in this) {
        console.log(i + " : " + this[i]);
    }
    for (var i in arguments) {
        console.log(i + " : " + arguments[i]);
    }
}

var myobj = { name: "zzoon" };

var myfunc = print_all.bind(myobj);
myfunc(); // "name : zzoon"

var myfunc1 = print_all.bind(myobj, "iamhjoo", "others");
myfunc1("insidejs");

/*
name : zzoon
0 : iamhjoo
1 : others
2 : insidejs
*/

/**
 * myfunc() 함수는 myobj 객체를 this에 바인딩시켜 print_all() 함수를 실행하는 함수
 * 인자도 bind() 함수에 모두 넘겨진다.
 * 특정 함수에 원하는 객체를 바인딩시켜 새로운 함수를 사용할 때 bind() 함수가 사용된다. 
 */