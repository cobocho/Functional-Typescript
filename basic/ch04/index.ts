/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const filter = curry((f: (a: T) => boolean, iter: Iterable<T>): Array<T> => {
  const result = []

  for (const a of iter) {
    if (f(a)) {
      result.push(a)
    }
  }

  return result
})

export const map = curry(
  (f: (item: T) => Result, iter: Iterable<T>): Array<Result> => {
    const result: Array<unknown> = []

    for (const a of iter) {
      result.push(f(a))
    }

    return result as Array<Result>
  },
)

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
  return curry(() => {
    if (!iter && isIterable(acc)) {
      iter = acc[Symbol.iterator]() as Generator<T>
      acc = (iter as Generator<A, Iterable<T>>).next().value
    }

    for (const a of iter!) {
      acc = f(acc as A, a)
    }

    return acc
  })
}

const log = console.log

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
]

function go(...args: any[]) {
  return reduce((a, f) => f(a), args)
}

go(products, (products: { name: string; price: number }) =>
  filter((p) => p.price, products),
)

function pipe(...fns: ((...args: any[]) => any)[]): (arg: any) => any {
  return (a) => go(a, ...fns)
}

const f = pipe(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100,
)

const curry =
  (f: Function) =>
  (a: any, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._)

const mult = curry((a: number, b: number) => a * b)

log(f(0))

log('mult', mult(1)(4))
