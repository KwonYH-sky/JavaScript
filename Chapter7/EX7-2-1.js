function sum(arr) {
    var len = arr.length;
    var i = 0, sum = 0;

    for (; i < len; i++) {
        sum += arr[i];
    }
    return sum;
}

var arr = [1, 2, 3, 4];
console.log(sum(arr)); // 10

/**
 * 명령형 프로그래밍 방식으로 작성된 각 배열의 원소의 합
 */