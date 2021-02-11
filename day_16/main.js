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
  const suesData = await getInput()

  const knownData = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
  }

  const sues = suesData.map(sueData => {
    let sue = {}

    for (const data in knownData) {
      const regexp = `Sue (\\d+):.* ${data}: (\\d+).*`
      const match = sueData.match(regexp)

      if (match) {
        sue = { [data]: Number(match[2]), ...sue }
      }
    }

    return sue
  })

  for (const sue of sues) {
    sue.match = true

    for (const d in knownData) {
      if (sue[d] !== undefined && sue[d] !== knownData[d]) {
        sue.match = false
        break
      }
    }
  }

  console.log(`Aunt Sue (1): ${sues.findIndex(sue => sue.match) + 1}`)

  const catsTrees = ['cats', 'trees']
  const pomeraniansGoldfish = ['pomeranians', 'goldfish']

  for (const sue of sues) {
    sue.match = true

    for (const d in knownData) {
      if (
        sue[d] !== undefined &&
        ((catsTrees.includes(d) && sue[d] <= knownData[d]) ||
          (pomeraniansGoldfish.includes(d) && sue[d] >= knownData[d]) ||
          (!catsTrees.includes(d) && !pomeraniansGoldfish.includes(d) && sue[d] !== knownData[d]))
      ) {
        sue.match = false
        break
      }
    }
  }

  console.log(`Aunt Sue (2): ${sues.findIndex(sue => sue.match) + 1}`)
}

main()
