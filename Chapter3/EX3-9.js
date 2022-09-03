//객체 리터럴을 통한 foo 객체 생성
var foo = {
    name : 'foo',
    nickname : 'babo'
};

console.log(foo.nickname); //babo
delete foo.nickname; // nickname 프로퍼티 삭제
console.log(foo.nickname); // undefined

delete foo; // foo 객체 삭제 시도
console.log(foo.name); // foo