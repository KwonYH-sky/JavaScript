// 강제로 인스턴스 생성하기
function A(arg) {
    if (!(this instanceof A)) // or if (!(this instanceof arguments.callee))
        return new A(arg);
    this.value = arg ? arg : 0;
}

var a = new A(100);
var b = A(10);

console.log(a.value); // 100
console.log(b.value); // 10
console.log(global.value); // undefined