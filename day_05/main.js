const fs = require('fs')
const readline = require('readline')

const getInput = async () => {
  return new Promise(resolve => {
    const lines = []

    readline
      .createInterface({ input: fs.createReadStream('input.txt') })
      .on('line', line => lines.push(line))
      .on('close', () => (lines.length === 1 ? resolve(lines[0]) : resolve(lines)))
  })
}

const isNiceV1 = string => {
  return (
    string.match(/([aeiou]\w*){3,}/) !== null &&
    ['ab', 'cd', 'pq', 'xy'].every(s => string.indexOf(s) === -1) &&
    string.match(/(\w)\1/) !== null
  )
}

const isNiceV2 = string => {
  return string.match(/(\w\w)\w*\1/) !== null && string.match(/(\w)\w\1/) !== null
}

const sum = (total, number) => total + number

const main = async () => {
  const input = await getInput()

  console.log(`Nice strings (1): ${input.map(isNiceV1).map(Number).reduce(sum)}`)
  console.log(`Nice strings (2): ${input.map(isNiceV2).map(Number).reduce(sum)}`)
}

main()

module.exports = main
