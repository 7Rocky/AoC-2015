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

const move = gif => {
  const newGif = []

  for (let j = 0; j < gif.length; j++) {
    const row = gif[j]
    let newRow = []

    for (let i = 0; i < row.length; i++) {
      const neighbours = countOnNeighbours(gif, i, j)

      if (row[i] === '#') {
        if (neighbours !== 2 && neighbours !== 3) {
          newRow.push('.')
        } else {
          newRow.push('#')
        }
      }

      if (row[i] === '.') {
        if (neighbours === 3) {
          newRow.push('#')
        } else {
          newRow.push('.')
        }
      }

      if (row[i] === '@') {
        newRow.push('@')
      }
    }

    newGif.push(newRow)
  }

  return newGif
}

const countLightsOn = s => s.match(/[#@]/g)?.length

const countOnNeighbours = (gif, i, j) => {
  if (i === 0 && j === 0) {
    return countLightsOn(gif[j][i + 1] + gif[j + 1][i] + gif[j + 1][i + 1])
  }

  if (i === gif[i].length - 1 && j === 0) {
    return countLightsOn(gif[j][i - 1] + gif[j + 1][i] + gif[j + 1][i - 1])
  }

  if (i === 0 && j === gif.length - 1) {
    return countLightsOn(gif[j][i + 1] + gif[j - 1][i] + gif[j - 1][i + 1])
  }

  if (i === gif[i].length - 1 && j === gif.length - 1) {
    return countLightsOn(gif[j][i - 1] + gif[j - 1][i] + gif[j - 1][i - 1])
  }

  if (i === 0) {
    return countLightsOn(
      gif[j - 1][i] + gif[j + 1][i] + gif[j - 1][i + 1] + gif[j][i + 1] + gif[j + 1][i + 1]
    )
  }

  if (i === gif[i].length - 1) {
    return countLightsOn(
      gif[j - 1][i] + gif[j + 1][i] + gif[j - 1][i - 1] + gif[j][i - 1] + gif[j + 1][i - 1]
    )
  }

  if (j === 0) {
    return countLightsOn(
      gif[j][i - 1] + gif[j][i + 1] + gif[j + 1][i - 1] + gif[j + 1][i] + gif[j + 1][i + 1]
    )
  }

  if (j === gif.length - 1) {
    return countLightsOn(
      gif[j][i - 1] + gif[j][i + 1] + gif[j - 1][i - 1] + gif[j - 1][i] + gif[j - 1][i + 1]
    )
  }

  return countLightsOn(
    gif[j - 1][i - 1] +
      gif[j - 1][i] +
      gif[j - 1][i + 1] +
      gif[j][i - 1] +
      gif[j][i + 1] +
      gif[j + 1][i - 1] +
      gif[j + 1][i] +
      gif[j + 1][i + 1]
  )
}

const getLightsOn = gif => {
  return gif
    .map(row => countLightsOn(row.join('')))
    .filter(n => !isNaN(n))
    .reduce((t, n) => t + n)
}

const main = async () => {
  const gifInput = await getInput()

  let gif1 = gifInput.map(row => row.split(''))
  let gif2 = gifInput.map(row => row.split(''))

  gif2[0][0] = '@'
  gif2[0][gif2.length - 1] = '@'
  gif2[gif2[0].length - 1][0] = '@'
  gif2[gif2[0].length - 1][gif2.length - 1] = '@'

  for (let i = 0; i < 100; i++) {
    gif1 = move(gif1)
    gif2 = move(gif2)
  }

  console.log(`Number of lights on after 100 steps (1): ${getLightsOn(gif1)}`)
  console.log(`Number of lights on after 100 steps fixing lights (2): ${getLightsOn(gif2)}`)
}

main()
