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

const sum = (total, number) => total + number
const diff = (a, b) => a - b
const prod = (total, number) => total * number

const getSides = ([l, w, h]) => [l * w, w * h, h * l]
const getSurface = lengths => 2 * getSides(lengths).reduce(sum)

const getWrappingPaper = lengths => {
  return getSurface(lengths) + getSides(lengths).sort(diff).shift()
}

const getRibbon = lengths => {
  return 2 * lengths.map(Number).sort(diff).slice(0, 2).reduce(sum) + lengths.reduce(prod, 1)
}

const reduceInput = (input, func) => input.map(box => func(box.split('x'))).reduce(sum)

const main = async () => {
  const input = await getInput()

  console.log(`Total wrapping paper surface (1): ${reduceInput(input, getWrappingPaper)}`)
  console.log(`Total feets of ribbon (2): ${reduceInput(input, getRibbon)}`)
}

main()
