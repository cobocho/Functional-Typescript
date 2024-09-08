const log = console.log

const add = (a: number, b: number) => a + b

const isIterable = <T>(a: any): a is IterableIterator<T> => Symbol.iterator in a

export function reduce<T, A>(
  f: (acc: A, cur: T) => A,
  acc: A,
  iter: Iterable<T> | Generator<T>,
): A

export function reduce<T, A>(f: (acc: A, cur: T) => A, iter: Iterable<T>): A

export function reduce<T, A>(
  f: (acc: A, cur: T) => A,
  acc: A | Iterable<T>,
  iter?: Iterable<T>,
) {
  if (!iter && isIterable(acc)) {
    iter = acc[Symbol.iterator]() as Generator<T>
    acc = (iter as Generator<A, Iterable<T>>).next().value
  }

  for (const a of iter!) {
    acc = f(acc as A, a)
  }

  return acc
}

log(reduce(add, 0, [1, 2, 3, 4, 5]))
log(reduce(add, [1, 2, 3, 4, 5]))

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
]

log(reduce((totalPrice, product) => totalPrice + product.price, 0, products))
