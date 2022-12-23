// myObject 객체 생성
var myObject = {
  name: "foo",
  sayName: function () {
    console.log(this.name);
  },
};

// otherObject 객체 생성
var otherObject = {
  name: "bar",
};

// otherObject.sayName() 매서드
otherObject.sayName = myObject.sayName;

myObject.sayName();
otherObject.sayName();