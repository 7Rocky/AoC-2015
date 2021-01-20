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

const changeLights = (op, orig, dest) => {
  for (let j = orig[1]; j <= dest[1]; j++) {
    for (let i = orig[0]; i <= dest[0]; i++) {
      lights[j][i] = op === 'turn on' ? true : op === 'turn off' ? false : !lights[j][i]
      brightness[j][i] += op === 'turn on' ? 1 : op === 'turn off' ? -1 : 2

      if (brightness[j][i] < 0) brightness[j][i] = 0
    }
  }
}

const sum = (total, number) => total + number
const sumAll = matrix => matrix.map(row => row.reduce(sum)).reduce(sum)

const lights = []
const brightness = []

const main = async () => {
  const input = await getInput()

  while (lights.length < 1000) {
    lights.push(new Array(1000).fill(false, 0, 1000))
    brightness.push(new Array(1000).fill(0, 0, 1000))
  }

  input.forEach(rule => {
    const match = rule.match(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/)
    changeLights(match[1], [match[2], match[3]].map(Number), [match[4], match[5]].map(Number))
  })

  console.log(`Number of lights lit (1): ${sumAll(lights)}`)
  console.log(`Total brightness (2): ${sumAll(brightness)}`)
}

main()
