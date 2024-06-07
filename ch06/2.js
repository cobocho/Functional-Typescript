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

const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs)

const L = {}

L.entries = function* (obj) {
  for (const k in obj) {
    yield [k, obj[k]]
  }
}

L.range = function* (l) {
  let i = -1
  while (++i < l) {
    yield i
  }
}

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield f(a)
  }
})

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) {
      yield a
    }
  }
})

const isIterable = (a) => a[Symbol.iterator]

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      yield* a
    } else {
      yield a
    }
  }
}

L.deepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      yield* f(a)
    } else {
      yield a
    }
  }
}

const takeAll = take(Infinity)

const map = curry(pipe(L.map, takeAll))
const filter = curry(pipe(L.filter, takeAll))
const flatten = pipe(L.flatten, takeAll)

go(
  range(10),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(2),
  // log,
)

go(
  L.range(10),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  take(2),
  // log,
)

const join = curry((sep = ',', iter) => {
  return reduce((a, b) => `${a}${sep}${b}`, iter)
})

const queryStr = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join('&'),
)

// log(queryStr({ limit: 10, offset: 10, type: 'notice' }))

const users = [
  { age: 32 },
  { age: 31 },
  { age: 37 },
  { age: 28 },
  { age: 35 },
  { age: 25 },
  { age: 32 },
  { age: 31 },
  { age: 37 },
]

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a))

// log(find((u) => u.age < 30)(users))

L.flatMap = curry(pipe(L.map, L.flatten))

const flatMap = curry(pipe(L.map, flatten))

log(
  flatMap(
    map((a) => a * a),
    [
      [1, 2],
      [3, 4],
      [5, 6, 7],
    ],
  ),
)
