/** Date 객체와 날짜
 * 날짜를 저장할 수 있고, 날짜와 관련된 메서드도 제공해주는 내장 객체 Date를 알아보자.
 * Date 객체를 활용하면 생성 및 수정 시간을 저장하거나 
 * 시간을 측정할 수 있고, 현재 날짜를 출력하는 용도 등으로도 활용 할 수 있다.
 */

/** 객체 생성하기
 * new Date()를 호출하면 새로운 Date 객체가 만들어지는데, new Date()는 다음과 같은 형태로 호출할 수 있다.
 * `new Date()`
 * 인수 없이 호출하면 현재 날짜와 시간이 저장된 Date 객체가 반환된다.
 */

let now = new Date();
alert(now); // 현재 날짜 및 시간이 출력됨

/* new Date(milliseconds)
 * UTC 기준(UTC+0) 1970년 1월 1일 0시 0분 0초에서 milliseconds 밀리초(1/1000초)후의 시점이 저장된 Date 객체가 반환된다.
 */

// 1970년 1월 1일 0시 0분 0초(UTC+0)를 나타내는 객체
let Jan01_1970 = new Date(0);
alert(Jan01_1970);

// 1970년 1월 1일의 24시간 후는 1970년 1월 2일(UTC+0)임 
let Jan02_1970 = new Date(24 * 3600 * 1000);
alert(Jan02_1970);

/* 1970년의 첫날을 기준으로 흘러간 밀리초를 나타내는 정수는 타임스탬프(timestamp)라고 부른다.
 * 타임스탬프를 사용하면 날짜를 숫자 형태로 간편하게 나타낼 수 있다.
 * `new Date(timestamp)`를 사용하여 타임스탬프를 사용해 특정 날짜가 저장된 Date 객체를 손쉽게 만들수 있고, 
 * date.getTime() 메서드를 사용해 Date 객체에서 타임스탬프를 추출하는 것도 가능하다.
 * 
 * 1970년 1월 1일 이전 날짜에 해당하는 타임스탬프 값은 음수이다.
 */

// 예시:
// 31 Dec 1969
let Dec31_1969 = new Date(-24 * 3600 * 1000);
alert(Dec31_1969);

/* `new Date(datestring)`
 * 인수가 하나인데, 문자열이라면 해당 문자열은 자동으로 구문 분석(parsed)된다.
 * 구문 분석에 적용되는 알고리즘은 `Date.parse`에서 사용하는 알고리즘과 동일하다.
 */

let date = new Date("2017-01-26");
alert(date);
// 인수로 시간을 지정하지 않았기 때문에 GMT 자정이라고 가정하고
// 코드가 실행되는 시간대(timezone)에 따라 출력 문자열이 바뀐다.
// 따라서 얼럿 창엔
// Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
// 혹은
// Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)등이 출력된다.

/* `new Date(year, month, date, hours, minutes, seconds, ms)`
 * 주어진 인수를 조합해 만들 수 있는 날짜가 저장도니 객체가 반환된다(지역 시간대 기준). 
 * 첫 번째와 두 번째 인수만 필수 값이다.
    * year는 반드시 네 자리 숫자여야한다. 2013은 괜찮고 98은 괜찮지 않다.
    * month는 0(1월)부터 11(12월) 사이의 숫자여야 한다.
    * date는 일을 나타내는데, 값이 없는 경우 1일로 처리된다.
    * hours/minutes/ms에 값이 없는 경우엔 0으로 처리된다.
 */

// 예시:
new Date(2011, 0, 1, 0, 0, 0, 0); // 2011년 1월 1일, 00시 00분 00초
new Date(2013, 0, 1); // hours를 비롯한 인수는 기본값이 0이므로 위와 동일

/* 최소 정밀도는 1밀리초(1/1000초)이다. */

date = new Date(2011, 0, 1, 2, 3, 4, 567);
alert(date); // 2011년 1월 1일, 02시 03분 04.567초

/////////////////////////////////////////////////////////////////////

/** 날짜 구성요소 얻기
 * `Date` 객체의 메서드를 사용하면 연, 월, 일 등의 값을 얻을 수 있다.
   * getFullYear()
      연도(네 자릿수)를 반환한다.
   * getMonth()
      월을 반환한다(0이상 11이하).
   * getDate()
      일을 반환한다(1이상 31이하).
   * getHours(), getMinutes(), getSeconds(), getMilliseconds()
      시, 분, 초, 밀리초를 반환한다.
 * 
 ** !) `getYear()`말고 getFullYear()를 사용하자!
 * 여러 자바스크립트 엔진이 더는 사용되지 않는(deprecated) 비표준 메서드 getYear()을 구현하고 있다.
 * 이 메서드는 두 자릿수 연도를 반환하는 경우가 있기 때문에 절대 사용해선 안 된다.
 * 연도 정보를 알고 싶다면 getFullYear()를 사용하자.
 
 * 이 외에도 요일을 반환해주는 메서드도 있다. 
   * getDay()
      일요일을 나타내는 0부터 토요일을 나타내는 6까지 숫자 중 하나를 반환한다. 
      몇몇 나라에서 요일의 첫낧이 일요일이 아니긴 하지만, getDay()에선 항상 0이 일요일을 나타낸다. 이를 변경할 방법은 없다.
 * 위에서 언급한 메서드는 모두 현지 시간 기준 날짜 구성요소를 반환한다.
 * 
 * 위 메서드 이름에 있는 'get'다음에 'UTC'를 붙여주면 표준시(UTC+0) 기준의 날짜 구성 요소를
 * 반환해주는 메서드 getUTCFullYear(), getUTCMonth(), getUTCDay()를 민들 수 있다.
 * 
 * 현재 시간대가 UTC 시간대와 다르다면 아래 예시를 실행했을 때 얼럿창엔 다른 값이 출력된다.
 */
date = new Date();

// 현재 시간 기준 시
alert(date.getHours());

// 표준시간대(UTC+0, 일광 절약 시간제를 적용하지 않는 런던 시간) 기준 시
alert(date.getUTCHours());

/* 아래 두 메서드는 위에서 소개한 메서드와 달리 표준시(UTC+0) 기준의 날짜 구성요소를 반환해주는 메서드가 없다.
   * getTime()
      주어진 일시와 1970년 1월 1일 00분 00초 사이의 간격(밀리초 단위)인 타임스탬프를 반환한다.
   * getTimezoneOffset()
      현재 시간과 표준시간의 차이(분)를 반환한다.
*/

// UTC-1 시간대에서 이 예시를 실행하면 60이 출력된다.
// UTC+3 시간대에서 이 예시를 실행하면 -180이 출력된다.
alert(new Date().getTimezoneOffset());

/////////////////////////////////////////////////////////////////

/** 날짜 구성요소 설정하기
 * 아래 메서드를 사용하면 날짜 구성요소를 설정할 수 있다.
   * setFullYear(year, [month], [date])
   * setMonth(month, [date])
   * setDate(date)
   * setHours(hour, [min], [sec], [ms])
   * setMinutes(min, [sec], [ms])
   * setSeconds(sec, [ms])
   * setMilliseconds(ms)
   * setTime(milliseconds) (1970년 1월 1일 00:00:00 UTC부터 밀리초 이후를 나타내는 날짜를 설정)
 * 
 * setTime()을 제외한 모든 메서드는 setUTCHours()같이 표준시에 따라 날짜 구성 요소를 설정해주는 메서드가 있다.
 * setHours와 같은 메서드는 여러 개의 날짜 구성요소를 동시에 설정할 수 있는데, 메서드의 인수에 없는 구성요소는 변경되지 않는다.
 */
// 예시
let today = new Date();

today.setHours(0);
alert(today); // 날짜는 변경되지 않고 시만 0으로 변경.

today.setHours(0, 0, 0, 0);
alert(today); // 날짜는 변경되지 않고 시, 분, 초가 모두 변경(00시 00분 00초).



/** 자동 고침
 * Date 객체엔 자동 고침(autocorrection)이라는 유용한 기능이 있다. 
 * 범위를 벗어나는 값을 설정하려고 하면 자동 고침 기능이 활성화되면서 값이 자동으로 수정된다.
 */
// 예시:
date = new Date(2013, 0, 32); // 2013년 1월 32일은 없다.
alert(date); // 2013년 2월 1일이 출력된다.

/* 입력받은 날짜 구성 요소가 범위를 벗어나면 초과분은 자동으로 다른 날짜 구성요소에 배분된다.
 * 
 * '2016년 2월 28일'의 이틀 뒤 날짜를 구하고 싶다고 가장하자. 답은 3월 2일 혹은 3월 1일(윤년)이 될텐데,
 * 2016년이 윤년인지 아닌지 생각할 필요 없이 단순히 이틀을 더해주기만 하면 답을 구할 수 있다.
 * 나머지 작업은 Date 객체가 알아서 해주기 때문이다.
 */
date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);

alert( date ); // 2016년 3월 1일

/* 자동 고침은 일정 시간이 지난 후의 날짜를 구하는데도 종종 사용된다.
 * '지금부터 70초 후'의 날짜를 구해보자.
 */
date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert(date); // 70초 후의 날짜가 출력된다.

/* 0이나 음수를 날짜 구성요소에 설정하는 것도 가능하다. */
date = new Date(2016, 0, 2); // 2016년 1월 2일

date.setDate(1); // 1일로 변경한다.
alert(date); // 2016년 1월 1일

date.setDate(0); // 일의 최솟값은 1이므로 0을 입력하면 전 달의 마지막 날을 설정한 것과 같은 효과를 본다.
alert(date); // 2015년 12월 31일

