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

class Wizard {
  constructor(hitpoints, mana) {
    this.hitpoints = hitpoints
    this.armor = 0
    this.mana = mana
    this.spells = []
    this.usedMana = 0
  }

  attack(enemy) {
    this.spells.filter(s => !s.isEffect).forEach(s => s.cast(this, enemy))
    this.spells = this.spells.filter(s => s.timer > 0)
  }

  effect(enemy) {
    this.spells.forEach(s => s.cast(this, enemy))
    this.spells = this.spells.filter(s => s.timer > 0)
  }

  copy() {
    const newWizard = new Wizard(this.hitpoints, this.mana)

    newWizard.spells = this.spells.map(s => s.copy())
    newWizard.usedMana = this.usedMana
    newWizard.armor = this.armor

    return newWizard
  }
}

class Boss {
  constructor(hitpoints, damage) {
    this.hitpoints = hitpoints
    this.damage = damage
  }

  attack(enemy) {
    const score = this.damage - enemy.armor
    enemy.hitpoints -= score > 0 ? score : 1
  }

  copy() {
    return new Boss(this.hitpoints, this.damage)
  }
}

const spells = [
  {
    name: 'Magic Missile',
    cost: 53,
    timer: 1,
    damage: 4,
    armor: 0,
    healHitpoints: 0,
    healMana: 0,
    isEffect: false
  },
  {
    name: 'Drain',
    cost: 73,
    timer: 1,
    damage: 2,
    armor: 0,
    healHitpoints: 2,
    healMana: 0,
    isEffect: false
  },
  {
    name: 'Shield',
    cost: 113,
    timer: 6,
    damage: 0,
    armor: 7,
    healHitpoints: 0,
    healMana: 0,
    isEffect: true
  },
  {
    name: 'Poison',
    cost: 173,
    timer: 6,
    damage: 3,
    armor: 0,
    healHitpoints: 0,
    healMana: 0,
    isEffect: true
  },
  {
    name: 'Recharge',
    cost: 229,
    timer: 5,
    damage: 0,
    armor: 0,
    healHitpoints: 0,
    healMana: 101,
    isEffect: true
  }
]

class Spell {
  constructor({ name, cost, timer, damage, armor, healHitpoints, healMana, isEffect }) {
    this.name = name
    this.cost = cost
    this.timer = timer
    this.damage = damage
    this.armor = armor
    this.healHitpoints = healHitpoints
    this.healMana = healMana
    this.isEffect = isEffect
    this.started = false
  }

  cast(wizard, enemy) {
    if (this.name === 'Shield') {
      if (!this.started) wizard.armor = this.armor
      if (this.timer === 1) wizard.armor = 0
    }

    enemy.hitpoints -= this.damage
    wizard.hitpoints += this.healHitpoints
    wizard.mana += this.healMana

    this.started = true
    this.timer--
  }

  copy() {
    return new Spell(this)
  }
}

const battle = (wizard, boss, level) => {
  if (wizard.usedMana >= minMana) return

  for (const spell of spells) {
    if (wizard.mana < spell.cost) continue

    const wizardCopy = wizard.copy()
    const bossCopy = boss.copy()

    if (level === 2) wizardCopy.hitpoints--

    wizardCopy.effect(bossCopy)

    if (wizardCopy.spells.some(s => s.name === spell.name && s.timer > 1)) continue

    wizardCopy.spells.push(new Spell(spell))
    wizardCopy.usedMana += spell.cost
    wizardCopy.mana -= spell.cost

    wizardCopy.attack(bossCopy)

    wizardCopy.effect(bossCopy)
    bossCopy.attack(wizardCopy)

    if (bossCopy.hitpoints <= 0) {
      if (minMana > wizardCopy.usedMana) minMana = wizardCopy.usedMana
    }

    if (wizardCopy.hitpoints > 0 && bossCopy.hitpoints > 0) {
      battle(wizardCopy, bossCopy, level)
    }
  }
}

const wizardHitpoints = 50
const wizardMana = 500

let minMana = Number.MAX_SAFE_INTEGER

const main = async () => {
  const input = await getInput()

  const bossHitpoints = Number(input.shift().split(': ')[1])
  const bossDamage = Number(input.shift().split(': ')[1])

  const boss = new Boss(bossHitpoints, bossDamage)
  const wizard = new Wizard(wizardHitpoints, wizardMana)

  battle(wizard.copy(), boss.copy(), 1)
  console.log(`Least amount of mana spent to win (1): ${minMana}`)

  minMana = Number.MAX_SAFE_INTEGER
  battle(wizard.copy(), boss.copy(), 2)
  console.log(`Least amount of mana spent to win (2): ${minMana}`)
}

main()
