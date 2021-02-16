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

const getIndeces = (str, substr) => {
  const length = substr.length
  const indeces = []

  for (let i = 0; i < str.length - length + 1; i++) {
    if (str.substring(i, i + length) === substr) {
      indeces.push(i)
    }
  }

  return indeces
}

const findReplacements = (chain, find, replace) => {
  const indeces = getIndeces(chain, find)

  for (const i of indeces) {
    molecules.add(chain.substring(0, i) + chain.substring(i).replace(find, replace))
  }
}

const nextNodes = node => {
  const next = []
  const { chain } = node

  for (const [find, replace] of rulesList.map(r => r.split(' => '))) {
    const indeces = getIndeces(chain, replace)

    for (const i of indeces) {
      next.push({ chain: chain.substring(0, i) + chain.substring(i).replace(replace, find) })
    }
  }

  return next
}

const breadthFirstSearch = root => {
  const queue = [root]
  const visited = new Set(root.chain)

  while (queue.length) {
    const node = queue.shift()

    if (node.chain === 'e') {
      return node.steps
    }

    for (const next of nextNodes(node)) {
      if (!visited.has(next.chain)) {
        next.steps = node.steps + 1
        queue.push(next)
        visited.add(next.chain)
        break
      }
    }
  }
}

const molecules = new Set()
let rulesList

const main = async () => {
  const input = await getInput()

  const chain = input.pop()
  input.pop()
  rulesList = input

  for (const rule of rulesList) {
    findReplacements(chain, ...rule.split(' => '))
  }

  console.log(`Number of distinct molecules (1): ${molecules.size}`)
  console.log(`Number of steps to create molecule (2): ${breadthFirstSearch({ chain, steps: 0 })}`)
}

main()
