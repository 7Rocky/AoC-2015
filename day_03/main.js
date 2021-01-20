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

const setPosition = (c, position) => {
  switch (c) {
    case '^':
      position[1]++
      break
    case '>':
      position[0]++
      break
    case 'v':
      position[1]--
      break
    case '<':
      position[0]--
      break
  }
}

const main = async () => {
  const input = await getInput()
  const santa = [0, 0]
  const santasPositions = new Set()

  santasPositions.add(santa.join(','))

  for (const c of input.split('')) {
    setPosition(c, santa)

    santasPositions.add(santa.join(','))
  }

  console.log(`Houses with at least one present (1): ${santasPositions.size}`)

  santa.fill(0)
  santasPositions.clear()

  const roboSanta = [0, 0]
  const roboSantasPositions = new Set()

  santasPositions.add(santa.join(','))
  roboSantasPositions.add(roboSanta.join(','))

  let santasTurn = true

  for (const c of input.split('')) {
    setPosition(c, santasTurn ? santa : roboSanta)

    if (santasTurn) santasPositions.add(santa.join(','))
    else roboSantasPositions.add(roboSanta.join(','))

    santasTurn = !santasTurn
  }

  const commonPositions = new Set([...santasPositions, ...roboSantasPositions])

  console.log(`Houses with at least one present with Robo-Santa (2): ${commonPositions.size}`)
}

main()
