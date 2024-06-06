import { curry, go, reduce } from '../fx.js'

const log = console.log

const range = (l) => {
  let i = -1
  const res = []
  while (++i < l) {
    res.push(i)
  }
  return res
}

const L = {
  *range(l) {
    let i = -1
    while (++i < l) {
      yield i
    }
  },
  *map(iter, f) {
    for (const a of iter) {
      yield f(a)
    }
  },
  *filter(iter, f) {
    for (const a of iter) {
      if (f(a)) {
        yield a
      }
    }
  },
}

const take = curry((l, iter) => {
  const res = []
  for (const a of iter) {
    res.push(a)
    if (res.length === l) {
      return res
    }
  }
  return res
})

const add = (a, b) => a + b

console.time('range')
go(range(100000000), take(5), reduce(add), log)
console.timeEnd('range')

console.time('L.range')
go(L.range(Infinity), take(5), reduce(add), log)
console.timeEnd('L.range')

const it = L.map([1, 2, 3, 4, 5], (a) => a + 10)
log([...it])

const it2 = L.filter([1, 2, 3, 4, 5], (a) => a % 2 === 0)
log([...it2])
