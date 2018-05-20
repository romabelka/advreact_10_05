export function generateId() {
  return Date.now() + Math.random()
}

export function generatePassword() {
  return Math.random()
    .toString(36)
    .slice(-8)
}
