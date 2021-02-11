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

const getPartitions = number => {
  const partitions = []

  for (let i = 1; i <= 96; i++) {
    for (let j = 1; j <= 96; j++) {
      for (let k = 1; k <= 96; k++) {
        for (let l = 1; l <= 96; l++) {
          if (i + j + k + l === number) partitions.push([i, j, k, l])
          if (i + j + k + l > number) break
        }
      }
    }
  }

  return partitions
}

const scalarProduct = (a, b) => {
  let result = 0

  for (let i = 0; i < a.length; i++) {
    result += a[i] * b[i]
  }

  return result < 0 ? 0 : result
}

const main = async () => {
  const ingredientsList = await getInput()

  const ingredients = { capacities: [], durabilities: [], flavors: [], textures: [], calories: [] }

  ingredientsList.forEach(ingredient => {
    const values = ingredient
      .match(
        /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/
      )
      .slice(2, 7)
      .map(Number)

    ingredients.capacities.push(values[0])
    ingredients.durabilities.push(values[1])
    ingredients.flavors.push(values[2])
    ingredients.textures.push(values[3])
    ingredients.calories.push(values[4])
  })

  const partitions = getPartitions(100)

  const resultsWithoutCalories = []
  const resultsWithCalories = []

  partitions.forEach(partition => {
    const partialsWithoutCalories = []
    const partialsWithCalories = []

    for (const property in ingredients) {
      if (property !== 'calories') {
        partialsWithoutCalories.push(scalarProduct(partition, ingredients[property]))
        partialsWithCalories.push(scalarProduct(partition, ingredients[property]))
      } else {
        const totalCalories = scalarProduct(partition, ingredients[property])

        if (totalCalories === 500) {
          partialsWithCalories.push(totalCalories)
        }
      }
    }

    resultsWithoutCalories.push(partialsWithoutCalories.reduce((t, n) => t * n, 1))

    if (partialsWithCalories.length === 5) {
      resultsWithCalories.push(partialsWithCalories.slice(0, 4).reduce((t, n) => t * n, 1))
    }
  })

  console.log(`Maximum cookie score (1): ${resultsWithoutCalories.sort((a, b) => b - a)[0]}`)
  console.log(`Maximum cookie score + 500 cal (2): ${resultsWithCalories.sort((a, b) => b - a)[0]}`)
}

main()
