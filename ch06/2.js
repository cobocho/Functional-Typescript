const log = console.log

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._)

const range = (l) => {
  let i = -1
  const res = []
  while (++i < l) {
    res.push(i)
  }
  return res
}

const map = curry((f, iter) => {
  const res = []
  iter = iter[Symbol.iterator]()
  let cur
  while (!(cur = iter.next()).done) {
    const a = cur.value
    res.push(f(a))
  }
  return res
})

const filter = curry((f, iter) => {
  const res = []
  iter = iter[Symbol.iterator]()
  let cur
  while (!(cur = iter.next()).done) {
    const a = cur.value
    if (f(a)) {
      res.push(a)
    }
  }
  return res
})

const take = curry((l, iter) => {
  const res = []
  iter = iter[Symbol.iterator]()
  let cur
  while (!(cur = iter.next()).done) {
    const a = cur.value
    res.push(a)
    if (res.length === l) {
      return res
    }
  }
  return res
})

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  } else {
    iter = iter[Symbol.iterator]()
  }
  let cur
  while (!(cur = iter.next()).done) {
    const a = cur.value
    acc = f(acc, a)
  }
  return acc
})

const go = (...args) => reduce((a, f) => f(a), args)

const L = {}

L.range = function* (l) {
  let i = -1
  while (++i < l) {
    yield i
  }
}

L.map = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]()
  let cur
  while (!(cur = iter.next()).done) {
    const a = cur.value
    yield f(a)
  }
})

L.filter = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]()
  let cur
  while (!(cur = iter.next()).done) {
    const a = cur.value
    if (f(a)) {
      yield a
    }
  }
})

go(
  range(10),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(2),
  log,
)

go(
  L.range(10),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  take(2),
  log,
)
