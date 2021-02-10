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

const main = async () => {
  const suesData = await getInput()

  const sues = []

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

  for (const d in knownData) {
    const regexp = `Sue (\\d+):.* ${d}: (\\d+).*`

    suesData.forEach(sue => {
      const match = sue.match(regexp)

      if (match) {
        sues[match[1] - 1] = { [d]: Number(match[2]), ...sues[match[1] - 1] }
      }
    })
  }

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
