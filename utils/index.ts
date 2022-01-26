import { randomBytes } from 'crypto'

function generateRandomString() {
  return randomBytes(128).toString('utf-8').replaceAll('\u0000', '')
}

async function checkJWT(token: string) {
  const res = await fetch(`/api/check?token=${token}`)
  const { valid } = await res.json()

  if (valid) {
    return true
  } else {
    return false
  }
}

export {
  generateRandomString,
  checkJWT
}
