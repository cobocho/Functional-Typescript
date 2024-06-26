/**
 * 평가
 * - 코드가 계산되어 값을 만드는 것
 */

/**
 * 일급
 * - 값으로 다룰 수 있다.
 * - 변수에 담을 수 있다.
 * - 함수의 인자로 사용할 수 있다.
 * - 함수의 결과로 사용할 수 있다.
 */

const a = 10
const add10 = (a: number) => a + 10
const r = add10(a)
console.log(r)

/**
 * 일급 함수
 * - 함수를 값으로 다룰 수 있다.
 * - 조합성과 추상화의 도구
 */

const add5 = (a: number) => a + 5
console.log(add5)
console.log(add5(5))

const f1 = () => () => 1
console.log(f1())

const f2 = f1()
console.log(f2)
console.log(f2())
