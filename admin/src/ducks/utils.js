import { OrderedMap } from 'immutable'

export function generateId() {
  return Date.now() + Math.random()
}

export const objectToOrderedMap = (obj, ItemRecord) =>
  Object.entries(obj).reduce(
    (acc, [id, value]) => acc.set(id, ItemRecord({ id, ...value })),
    OrderedMap()
  )
