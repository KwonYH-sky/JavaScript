var ArrCreate = function (arg) {
    var arr = [1, 2, 3];

    return {
        getArr: function () {
            return arr;
        }
    };
};

var obj = ArrCreate(); /* or var obj = new ArrCreate(); */
var arr = obj.getArr();
arr.push(5);
console.log(obj.getArr()); // [1, 2, 3, 5]

/**
 * 위와 같은 문제로 개게를 반환하는 경우 신중해야함.
 * 보통 같은 경우, 객체를 반환하지 않고 
 * 객체의 주요 정보를 새로운 객체에 담라서 반환하는 방법을 많이 사용
 * 꼭 개게를 반환되어야하는 경우에는 깊은 복사로 복사본을 만들어서 반환하는 방법을 사용하는 것이 좋다.
 */
