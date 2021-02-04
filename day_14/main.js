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

class Reindeer {
  #velocity
  #totalTimeFlying
  #totalTimeResting
  #distance = 0
  #timeFlying = 0
  #timeResting = 0
  #isFlying = false
  #points = 0

  constructor(velocity, totalTimeFlying, totalTimeResting) {
    this.#velocity = velocity
    this.#totalTimeFlying = totalTimeFlying
    this.#totalTimeResting = totalTimeResting
  }

  race() {
    if (!this.#isFlying && this.#timeResting === 0) {
      this.#isFlying = true
      this.#timeFlying = this.#totalTimeFlying
    }

    if (this.#isFlying && this.#timeFlying === 0) {
      this.#isFlying = false
      this.#timeResting = this.#totalTimeResting
    }

    if (this.#isFlying && this.#totalTimeFlying >= this.#timeFlying) {
      this.#timeFlying--
      this.#distance += this.#velocity
    }

    if (!this.#isFlying && this.#totalTimeResting >= this.#timeResting) {
      this.#timeResting--
    }
  }

  getDistance() {
    return this.#distance
  }

  getPoints() {
    return this.#points
  }

  increasePoints() {
    this.#points++
  }
}

const main = async () => {
  const stats = await getInput()

  const reindeers = stats.map(
    stat =>
      new Reindeer(
        ...stat
          .match(
            /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\./
          )
          .slice(2, 5)
          .map(Number)
      )
  )

  let timeLimit = 2503
  let maxDistance

  while (timeLimit--) {
    reindeers.forEach(reindeer => reindeer.race())

    maxDistance = reindeers
      .map(reindeer => reindeer.getDistance())
      .sort((a, b) => a - b)
      .pop()

    reindeers
      .filter(reindeer => reindeer.getDistance() === maxDistance)
      .forEach(reindeer => reindeer.increasePoints())
  }

  const maxPoints = reindeers
    .map(reindeer => reindeer.getPoints())
    .sort((a, b) => a - b)
    .pop()

  console.log(`Distance of the winning reindeer (1): ${maxDistance}`)
  console.log(`Points of the winning reindeer (2): ${maxPoints}`)
}

main()
