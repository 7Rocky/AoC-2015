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

const permute = (input, permArr = [], usedElements = []) => {
  for (let i = 0; i < input.length; i++) {
    let numbers = input.splice(i, 1)[0]
    usedElements.push(numbers)

    if (!input.length) permArr.push(usedElements.slice())

    permute(input, permArr, usedElements)
    input.splice(i, 0, numbers)
    usedElements.pop()
  }

  return permArr
}

const main = async () => {
  const input = await getInput()

  const graph = {}

  for (const line of input) {
    const match = line.match(/(\w+) to (\w+) = (\d+)/)

    for (const i of [1, 2]) {
      if (graph[match[i]] === undefined) {
        graph[match[i]] = {}
      }
    }

    graph[match[1]][match[2]] = Number(match[3])
    graph[match[2]][match[1]] = Number(match[3])
  }

  let minDistance = Number.MAX_SAFE_INTEGER
  let maxDistance = 0

  for (const path of permute(Object.keys(graph))) {
    let distance = 0

    for (let i = 1; i < path.length; i++) {
      distance += graph[path[i - 1]][path[i]]
    }

    if (minDistance > distance) {
      minDistance = distance
    }

    if (maxDistance < distance) {
      maxDistance = distance
    }
  }

  console.log(`Minimum total distance (1): ${minDistance}`)
  console.log(`Maximum total distance (2): ${maxDistance}`)
}

main()
