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

let targetArrays = []

const subset = (arr, k, start, length, used, target) => {
  const currentArray = []

  if (length === k) {
    for (let i = 0; i < arr.length; i++) {
      if (used[i]) currentArray.push(arr[i])
    }

    if (currentArray.reduce(sum) === target) {
      targetArrays.push(currentArray)
    }

    return
  }

  if (start === arr.length) return

  used[start] = true
  subset(arr, k, start + 1, length + 1, used, target)

  used[start] = false
  subset(arr, k, start + 1, length, used, target)
}

const sum = (t, n) => t + n
const prod = (t, n) => t * n

let numbers

const main = async () => {
  const input = await getInput()
  numbers = input.map(Number)

  let weight = numbers.reduce(sum) / 3

  for (let i = 1; !targetArrays.length; i++) {
    subset(numbers, i, 0, 0, Array(numbers.length).fill(false), weight)
  }

  let minQuantumEntanglement = targetArrays.map(n => n.reduce(prod)).sort((a, b) => a - b)[0]

  console.log(`Minimum quantum entanglement with 3 groups (1): ${minQuantumEntanglement}`)

  targetArrays = []

  weight = numbers.reduce(sum) / 4

  for (let i = 1; !targetArrays.length; i++) {
    subset(numbers, i, 0, 0, Array(numbers.length).fill(false), weight)
  }

  minQuantumEntanglement = targetArrays.map(n => n.reduce(prod)).sort((a, b) => a - b)[0]

  console.log(`Minimum quantum entanglement with 4 groups (2): ${minQuantumEntanglement}`)
}

main()
