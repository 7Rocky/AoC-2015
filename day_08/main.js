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

const sum = (t, n) => t + n

const encodeCharacters = string => `"${string.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`

const main = async () => {
  const input = await getInput()

  const totalLengthCode = input.map(line => line.length).reduce(sum)
  const totalLengthMemory = input.map(line => eval(line).length).reduce(sum)
  const totalLengthEncoded = input.map(line => encodeCharacters(line).length).reduce(sum)

  console.log(`Total code minus memory length (1): ${totalLengthCode - totalLengthMemory}`)
  console.log(`Total encoded minus code length (2): ${totalLengthEncoded - totalLengthCode}`)
}

main()
