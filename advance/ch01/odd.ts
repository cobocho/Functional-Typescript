import { filter, map, pipe, reduce, take } from '@fxts/core'

const odd = (limit: number, arr: number[]) => {
  return pipe(
    arr,
    filter((x) => x % 2 === 1),
    take(limit),
    map((x) => x * x),
    reduce((x, y) => x + y),
  )
}

console.log(odd(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
