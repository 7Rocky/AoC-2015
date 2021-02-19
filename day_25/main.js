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

const main = async () => {
  const input = await getInput()

  const [row, column] = input
    .match(/row (\d+), column (\d+)/)
    .slice(1, 3)
    .map(Number)

  const position = 1 + ((row + column) ** 2 - 3 * row - column) / 2

  let code = 20151125

  for (let i = 1; i < position; i++) {
    code = (code * 252533) % 33554393
  }

  console.log(`Code for the machine (1): ${code}`)
}

main()
