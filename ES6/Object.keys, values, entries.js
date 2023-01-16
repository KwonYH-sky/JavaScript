/** Object.keys, values, entries
 * 순회에 필요한 메서드 map.keys(), map.values(), map.entries()에 대해 알아보았다.
 * 
 * 이 메서드들은 포괄적인 용도로 만들어졌기 때문에 메서드를 적용할 자료구조는 일련의 함의를 준수해야 한다.
 * 커스텀 자료구조를 대상으로 순회를 해야 한다면 이 메서드들을 쓰지 못하고 직접 메서드를 구현해야 한다.
 * 
 * keys(), values(), entries()를 사용할 수 있는 자료구조는 다음과 같다.
    * Map
    * Set
    * Array
 * 일반 객체에도 순회 관련 메서드가 있긴 한데, keys(), values(), entries()와는 문법에 차이가 있다.
 */

/**
 * 일반 객체면 다음과 같은 메서드를 사용할 수 있다.
    * Object.keys(obj) - 객체의 키만 담은 배열을 반환한다.
    * Object.values(obj) - 객체의 값만 담은 배열을 반환한다.
    * Object.entries(obj) - [키, 값] 쌍을 담은 배열을 반환한다.
 * 
 * Map, Set, Array 전용 메서드와 일반 객체용 메서드의 차이를 (맵을 기준으로) 비교하면 다음과 같다.
    * 맵
        * map.key()
        * 반환값 - iterable 객체
    * 객체
        * Object.keys(obj) (obj.keys() 아님)
        * 반환값 - "진짜"배열
 * 첫 번째 차이는 obj.keys()가 아닌 Object.keys(obj)를 호출한다는 점이다.
 * 
 * 이렇게 문법이 다른 이유는 유연성 때문이다. 아시다시피 자바스크립트에선 복잡한 자료구조 전체가 객체에 기반한다.
 * 그러다보니 객체 data에 자체적으로 data.values()라는 메서드를 구현해 사용하는 경우가 있을 수 있다. 
 * 이렇게 커스텀 메서드를 구현한 상태라도 Object.values(data)같은 형태로 메서드를 호출할 수 있으면 커스텀 메서드와 내장 메서드 둘 다 사용할 수 있다.
 * 
 * 두 번째 차이는 메서드 Object.*를 호출하면 iterable 객체가 아닌 객체의 한 종류인 배열을 반환한다는 점이다.
 * '진짜'배열을 반환하는 이유는 하위 호환성 때문이다.
 * 
 * 예시:
 * let user = {
 *  name: "John",
 *  age: 30
 * };
    * Object.keys(user) = ["name", "age"]
    * Object.values(user) = ["John", 30]
    * Object.entries(user) = [ ["name", "John"], ["age", 30]]
 * 
 * 아래 예시처럼 Object.values를 사용하면 프로퍼티 값을 대상으로 원하는 작업을 할 수 있다.
 */
let user = {
    name: "Violet",
    age: 30
};

// 값을 순회한다.
for (let value of Object.values(user)) {
    alert(value); // Violet과 30이 연속적으로 출력됨
}
