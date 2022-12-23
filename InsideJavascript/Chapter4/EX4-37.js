// Person 생성자 함수
function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}

// foo 객체 생성
var foo = new Person('foo', 20, 'woman');

console.dir(Person);
console.dir(foo);