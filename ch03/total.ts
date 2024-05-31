import { filter } from './filter'
import { map } from './map'
import { reduce } from './reduce'

const log = console.log

const products: {
  name: string
  price: number
}[] = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
]

const add = (a: number, b: number) => a + b

log(
  reduce(
    add,
    map(
      (p) => p.price,
      filter((p) => p.price < 20000, products),
    ),
  ),
)

log(
  reduce(
    add,
    filter(
      (p) => p < 20000,
      map((p) => p.price, products),
    ),
  ),
)
