import { each, map, pipe, range } from '@fxts/core'

const innerGugu = (x: number) => {
  return pipe(
    range(1, 10),
    map((y) => {
      return `${x} * ${y} = ${x * y}`
    }),
    each(console.log),
  )
}

const gugu = () => {
  pipe(range(2, 10), each(innerGugu))
}

gugu()
