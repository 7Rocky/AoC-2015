const getDivisors = number => {
  const divisors = new Set()

  for (let d = 1; d ** 2 <= number; d++) {
    if (number % d === 0) {
      divisors.add(d)
    }
  }

  Array(...divisors).forEach(d => divisors.add(number / d))

  return [...divisors]
}

const sum = (t, n) => t + n

const getPresents = (house, level) => {
  let divisors = getDivisors(house)

  if (level === 2) {
    divisors = divisors.filter(d => house < 50 * d)
  }

  return divisors.reduce(sum, 0) * (9 + level)
}

const main = () => {
  const input = 34000000
  let house = 1

  for (const level of [1, 2]) {
    while (getPresents(++house, level) < input);

    console.log(`First house with more than 34M presents (${level}): ${house}`)
  }
}

main()
