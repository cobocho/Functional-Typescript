const log = console.log

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
]

// 이터러블 프로토콜을 따르는 모든 값에 대해 map을 적용가능함
export const map = <T, Result>(
  f: (item: T) => Result,
  iter: Iterable<T>,
): Array<Result> => {
  const result: Array<unknown> = []

  for (const a of iter) {
    result.push(f(a))
  }

  return result as Array<Result>
}

// const names = []
// for (const p of products) {
//   names.push(p.name)
// }
// log(names)
log(map((p) => p.price, products))

// const prices = []
// for (const p of products) {
//   prices.push(p.price)
// }
// log(prices)
log(map((p) => p.price, products))

function* gen() {
  yield 2
  yield 3
  yield 4
}

log(map((a) => a * a, gen()))

const m = new Map<string, number>()
m.set('a', 10)
m.set('b', 20)

log(new Map(map(([k, v]) => [k, v * 2], m)))
