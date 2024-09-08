const log = console.log

/**
 * 제너레이터/이터레이터
 * - 제너레이터: 이터레이터이자 이터러블 생성하는 함수
 */

function* gen() {
  yield 1
  yield 2
  yield 3

  return 100 // 순회에 포함되지 않음
}

const iter = gen()
log(iter.next())
log(iter.next())
log(iter.next())
log(iter.next())
log(iter.next())

for (const a of gen()) {
  log(a)
}

function* infinity(i = 0) {
  while (true) {
    yield i++
  }
}

function* limit(l: number, iter: Generator<number>) {
  for (const a of iter) {
    yield a
    if (a === l) {
      return
    }
  }
}

function* odds(l: number = Infinity) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) {
      yield a
    }
  }
}

const iter2 = odds(10)
log(iter2.next())
log(iter2.next())
log(iter2.next())
log(iter2.next())
log(iter2.next())
log(iter2.next())
log(iter2.next())
log(iter2.next())

// const iter3 = infinity(3)
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
