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
  const parens = input.split('')

  const result = parens.filter(p => p === '(').length - parens.filter(p => p === ')').length

  let floor = 0
  let i

  for (i = 0; i < parens.length; i++) {
    floor += parens[i] === '(' ? 1 : -1

    if (floor === -1) break
  }

  console.log(`Santa's floor (1): ${result}`)
  console.log(`First position where Santa enters the basement (2): ${i + 1}`)
}

main()
