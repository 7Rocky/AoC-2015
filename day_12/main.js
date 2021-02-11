const fs = require('fs')
const readline = require('readline')

const getInput = async () => {
  return new Promise(resolve => {
    const lines = []

    readline
      .createInterface({ input: fs.createReadStream('input.txt') })
      .on('line', line => lines.push(line))
      .on('close', () => resolve(lines.length === 1 ? lines[0] : lines))
  })
}

const sumNumbersSkip = object => {
  let number = 0

  const sumNumbersElement = element => {
    const type = typeof element
    number += type === 'number' ? element : type === 'object' ? sumNumbersSkip(element) : 0
  }

  if (Array.isArray(object)) {
    for (const element of object) {
      sumNumbersElement(element)
    }
  } else {
    if (Object.keys(object).some(k => k === 'red' || object[k] === 'red')) return 0

    for (const key in object) {
      sumNumbersElement(object[key])
    }
  }

  return number
}

const sum = (t, n) => t + n

const main = async () => {
  const input = await getInput()

  let numbers = input
    .match(/(-?\d+)/g)
    .map(Number)
    .reduce(sum)

  console.log(`Sum of all numbers (1): ${numbers}`)
  console.log(`Sum of all numbers skipping "red" (2): ${sumNumbersSkip(JSON.parse(input))}`)
}

main()
