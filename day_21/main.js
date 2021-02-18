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

class Player {
  constructor(hitpoints, damage, armor, cost) {
    this.hitpoints = hitpoints
    this.damage = damage
    this.armor = armor
    this.cost = cost
  }

  attack(enemy) {
    const score = this.damage - enemy.armor
    enemy.hitpoints -= score > 0 ? score : 1
  }
}

const weapons = [
  { name: 'Dagger', cost: 8, damage: 4, armor: 0 },
  { name: 'Shortsword', cost: 10, damage: 5, armor: 0 },
  { name: 'Warhammer', cost: 25, damage: 6, armor: 0 },
  { name: 'Longsword', cost: 40, damage: 7, armor: 0 },
  { name: 'Greataxe', cost: 74, damage: 8, armor: 0 }
]

const armors = [
  { name: 'Leather', cost: 13, damage: 0, armor: 1 },
  { name: 'Chainmail', cost: 31, damage: 0, armor: 2 },
  { name: 'Splintmail', cost: 53, damage: 0, armor: 3 },
  { name: 'Bandedmail', cost: 75, damage: 0, armor: 4 },
  { name: 'Platemail', cost: 102, damage: 0, armor: 5 }
]

const rings = [
  { name: 'Damage +1', cost: 25, damage: 1, armor: 0 },
  { name: 'Damage +2', cost: 50, damage: 2, armor: 0 },
  { name: 'Damage +3', cost: 100, damage: 3, armor: 0 },
  { name: 'Defense +1', cost: 20, damage: 0, armor: 1 },
  { name: 'Defense +2', cost: 40, damage: 0, armor: 2 },
  { name: 'Defense +3', cost: 80, damage: 0, armor: 3 }
]

const playerHitpoints = 100

const makeCombinations = () => {
  const combinations = []

  for (const w of weapons) {
    combinations.push(new Player(playerHitpoints, w.damage, w.armor, w.cost))
  }

  for (const w of weapons) {
    for (const a of armors) {
      combinations.push(
        new Player(playerHitpoints, w.damage + a.damage, w.armor + a.armor, w.cost + a.cost)
      )
    }
  }

  for (const w of weapons) {
    for (const r of rings) {
      combinations.push(
        new Player(playerHitpoints, w.damage + r.damage, w.armor + r.armor, w.cost + r.cost)
      )
    }
  }

  for (const w of weapons) {
    for (const a of armors) {
      for (const r of rings) {
        combinations.push(
          new Player(
            playerHitpoints,
            w.damage + a.damage + r.damage,
            w.armor + a.armor + r.armor,
            w.cost + a.cost + r.cost
          )
        )
      }
    }
  }

  for (const w of weapons) {
    for (const r1 of rings) {
      for (const r2 of rings.filter(r => r.name !== r1.name)) {
        combinations.push(
          new Player(
            playerHitpoints,
            w.damage + r1.damage + r2.damage,
            w.armor + r1.armor + r2.armor,
            w.cost + r1.cost + r2.cost
          )
        )
      }
    }
  }

  for (const w of weapons) {
    for (const a of armors) {
      for (const r1 of rings) {
        for (const r2 of rings.filter(r => r.name !== r1.name)) {
          combinations.push(
            new Player(
              playerHitpoints,
              w.damage + a.damage + r1.damage + r2.damage,
              w.armor + a.armor + r1.armor + r2.armor,
              w.cost + a.cost + r1.cost + r2.cost
            )
          )
        }
      }
    }
  }

  return combinations
}

const battle = (player, boss) => {
  while (player.hitpoints > 0 && boss.hitpoints > 0) {
    player.attack(boss)
    if (boss.hitpoints <= 0) break
    boss.attack(player)
  }
}

const main = async () => {
  const input = await getInput()

  const bossHitpoints = Number(input.shift().split(': ')[1])
  const bossDamage = Number(input.shift().split(': ')[1])
  const bossArmor = Number(input.shift().split(': ')[1])

  const combinations = makeCombinations()

  const combinationsAsc = combinations.sort((a, b) => a.cost - b.cost)
  const combinationsDesc = combinationsAsc.slice(0).reverse()

  for (const player of combinationsAsc) {
    const boss = new Player(bossHitpoints, bossDamage, bossArmor, 0)

    battle(player, boss)

    if (player.hitpoints > 0) {
      console.log(`Win with the least amount of gold (1): ${player.cost}`)
      break
    }
  }

  for (const player of combinationsDesc) {
    const boss = new Player(bossHitpoints, bossDamage, bossArmor, 0)

    battle(player, boss)

    if (player.hitpoints <= 0) {
      console.log(`Lose with the most amount of gold (2): ${player.cost}`)
      break
    }
  }
}

main()
