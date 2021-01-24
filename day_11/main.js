const OFFSET = 'a'.codePointAt(0)
const BASE = 'z'.codePointAt(0) - OFFSET + 1

const containsSequentialLetters = password => {
  for (let i = OFFSET; i < OFFSET + BASE - 2; i++) {
    if (password.includes(Buffer.from([i, i + 1, i + 2]).toString())) {
      return true
    }
  }

  return false
}

const containsPairsOfLetters = password => {
  let count = 0

  for (let i = OFFSET; i < OFFSET + BASE; i++) {
    if (password.includes(Buffer.from([i, i]).toString())) {
      count++
    }
  }

  return count > 1
}

const isValid = password => {
  if (password.match(/[i|l|o]/)) return false
  if (!containsPairsOfLetters(password)) return false
  return containsSequentialLetters(password)
}

const numberToString = (number, length) => {
  const coefficients = []

  while (length) {
    coefficients.unshift(OFFSET + (number % BASE))
    number = Math.floor(number / BASE)
    length--
  }

  return Buffer.from(coefficients).toString()
}

const stringToNumber = string => {
  let number = 0

  for (let i = 0; i < string.length; i++) {
    number += (string.codePointAt(i) - OFFSET) * BASE ** (string.length - 1 - i)
  }

  return number
}

const nextPassword = password => {
  const length = password.length
  let number = stringToNumber(password)

  while (!isValid(numberToString(++number, length)));

  return numberToString(number, length)
}

const main = () => {
  const input = 'vzbxkghb'

  const next = nextPassword(input)

  console.log(`Santa's next password (1): ${next}`)
  console.log(`Santa's next next password (2): ${nextPassword(next)}`)
}

main()
