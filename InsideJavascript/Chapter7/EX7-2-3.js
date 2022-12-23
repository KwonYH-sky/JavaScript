function reduce(func, arr, memo) {
    var len = arr.length;
    i = 0,
        accum = memo;

    for (; i < len; i++) {
        accum = func(accum, arr[i]);
    }
    return accum;
}

/**
 * 함수와 배열을 인자로 넘겨 받고 루프를 돌면서 함수를 실행
 * 얻은 결과값은 변수 accum에 계속해서 저장, 배열의 길이 만큼 루프 수행
 * 최종적으로 accum값을 반환
 */

