import { each, map, pipe, range } from '@fxts/core'

const star = (amount: number) => {
  pipe(
    range(1, amount + 1),
    map((x) => 'x'.repeat(x)),
    each(console.log),
  )
}

star(5)
