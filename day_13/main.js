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

const calculateHappiness = dist => {
  const length = dist.length
  let happiness =
    dist[0][dist[1].name] +
    dist[0][dist[length - 1].name] +
    dist[length - 1][dist[length - 2].name] +
    dist[length - 1][dist[0].name]

  for (let i = 1; i < length - 1; i++) {
    happiness += dist[i][dist[i - 1].name] + dist[i][dist[i + 1].name]
  }

  return happiness
}

const getMaxHappiness = people => {
  const permutations = permute(Object.values(people))
  let maxHappiness = 0

  for (const permutation of permutations) {
    const happiness = calculateHappiness(permutation)

    if (maxHappiness < happiness) maxHappiness = happiness
  }

  return maxHappiness
}

const main = async () => {
  const input = await getInput()

  const people = {}

  for (const line of input) {
    const m = line.match(/(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)\./)

    if (people[m[1]]) {
      people[m[1]][m[4]] = (m[2] === 'lose' ? -1 : 1) * Number(m[3])
    } else {
      people[m[1]] = {
        name: m[1],
        [m[4]]: (m[2] === 'lose' ? -1 : 1) * Number(m[3])
      }
    }
  }

  console.log(`Maximum happiness (1): ${getMaxHappiness(people)}`)

  const me = { name: 'Me' }

  for (const name in people) {
    me[name] = 0
    people[name][me.name] = 0
  }

  people[me.name] = me

  console.log(`Maximum happiness including me (2): ${getMaxHappiness(people)}`)
}

main()
