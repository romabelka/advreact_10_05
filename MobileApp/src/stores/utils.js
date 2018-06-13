export const fbToEntities = (data) =>
  Object.entries(data).map(([uid, entity]) => ({ uid, ...entity }))
