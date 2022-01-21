function generateRandomString() {
  let str = ''

  for (let step = 0; step < 50; step++) {
    str += String.fromCharCode(Math.floor(Math.random() * 65534 + 1))
  }

  return str
}

export { generateRandomString }
