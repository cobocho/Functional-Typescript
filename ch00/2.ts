/**
 * 고차 함수
 * - 함수를 값으로 다루는 함수
 *   - 함수를 인자로 받아서 실행하는 함수
 *   - apply1
 *   - times
 */

const apply1 = (fn: (a: number) => void) => fn(1)
const add2 = (a: number) => a + 2
console.log(apply1(add2))
console.log(apply1((a: number) => a - 1))

const times = (fn: (a: number) => void, n: number) => {
  let i = -1
  while (++i < n) {
    fn(i)
  }
}

times(console.log, 3)
times((a) => console.log(a + 10), 3)

/**
 * 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하는 함수)
 * - addMaker
 */

const addMaker = (a: number) => (b: number) => a + b
const add10 = addMaker(10)
console.log(add10(5))
console.log(add10(10))
