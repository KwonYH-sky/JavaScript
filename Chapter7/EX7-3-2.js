function fact(num) {
    if (num == 0) {
        return 1;
    } else {
        return num * fact(num - 1);
    }
}

console.log(fact(100));

/**
 * 명령형 프로그래밍 방식의 재귀함수형 팩토리얼
 */