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

const process = instructions => {
  for (let pc = 0; pc < instructions.length; pc++) {
    let [type, reg, offset] = instructions[pc].split(' ')

    reg = reg.replace(',', '')
    offset = type !== 'jmp' ? Number(offset) : Number(reg)

    switch (type) {
      case 'hlf':
        registers[reg] >>= 1
        break
      case 'tpl':
        registers[reg] *= 3
        break
      case 'inc':
        registers[reg]++
        break
      case 'jmp':
        pc += offset - 1
        break
      case 'jie':
        pc += registers[reg] % 2 ? 0 : offset - 1
        break
      case 'jio':
        pc += registers[reg] === 1 ? offset - 1 : 0
        break
    }
  }
}

const registers = { a: 0, b: 0 }

const main = async () => {
  const input = await getInput()

  process(input)
  console.log(`Value of register b (1): ${registers.b}`)

  registers.a = 1
  registers.b = 0

  process(input)
  console.log(`Value of register b (2): ${registers.b}`)
}

main()
