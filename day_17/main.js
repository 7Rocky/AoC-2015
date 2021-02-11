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

const sumCombinations = (containers, target) => {
  const ways = []
  const length = containers.length

  for (let b = 2 ** length - 1; b >= 0; b--) {
    let sum = 0
    let way = ''

    for (let i = 0; i < length; i++) {
      if (sum > target) break

      if ((b >> (length - 1 - i)) & 1) {
        sum += containers[i]
        way += containers[i] + ','
      }
    }

    if (sum === target) {
      ways.push(way)
    }
  }

  return ways
}

const main = async () => {
  let containers = await getInput()

  containers = containers.map(Number).sort((a, b) => b - a)

  const ways = sumCombinations(containers, 150)

  const lengths = ways.map(way => way.split(',').length)

  const min = lengths.sort((a, b) => a - b)[0]
  const numWaysMinLength = lengths.filter(length => length === min).length

  console.log(`Number of ways to get 150 litters (1): ${ways.length}`)
  console.log(`Number of ways to store in minimum number of containers (2): ${numWaysMinLength}`)
}

main()
