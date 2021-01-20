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

const connectWires = (input, initB) => {
  const wires = {}

  if (initB) {
    const bAssignmentIndex = input.findIndex(rule => rule.endsWith('-> b'))
    input[bAssignmentIndex] = `${initB} -> b`
  }

  while (wires['a'] === undefined) {
    input.forEach(rule => {
      const match1 = rule.match(/^(\w+) -> (\w+)/m)
      const match2 = rule.match(/NOT (\w+) -> (\w+)/)
      const match3 = rule.match(/(\w+) (AND|OR|[LR]SHIFT) (\w+) -> (\w+)/)

      if (match1 !== null) {
        if (isNaN(Number(match1[1]))) {
          if (wires[match1[1]] !== undefined) {
            wires[match1[2]] = wires[match1[1]]
          }
        } else {
          wires[match1[2]] = Number(match1[1])
        }
      } else if (match2 !== null) {
        if (wires[match2[1]] !== undefined) {
          wires[match2[2]] = ~wires[match2[1]] & 0xffff
        }
      } else if (match3 !== null) {
        switch (match3[2]) {
          case 'AND':
            if (isNaN(Number(match3[3])) && wires[match3[3]] !== undefined) {
              if (isNaN(Number(match3[1])) && wires[match3[1]] !== undefined) {
                wires[match3[4]] = wires[match3[1]] & wires[match3[3]]
              } else {
                wires[match3[4]] = Number(match3[1]) & wires[match3[3]]
              }
            }
            break
          case 'OR':
            if (wires[match3[1]] !== undefined && wires[match3[3]] !== undefined) {
              wires[match3[4]] = wires[match3[1]] | wires[match3[3]]
            }
            break
          case 'LSHIFT':
            if (wires[match3[1]] !== undefined) {
              wires[match3[4]] = (wires[match3[1]] << Number(match3[3])) & 0xffff
            }
            break
          case 'RSHIFT':
            if (wires[match3[1]] !== undefined) {
              wires[match3[4]] = wires[match3[1]] >> Number(match3[3])
            }
            break
          default:
        }
      }
    })
  }

  return wires['a']
}

const main = async () => {
  const input = await getInput()

  let a = connectWires(input)

  console.log(`Value of wire 'a' (1): ${a}`)

  a = connectWires(input, a)

  console.log(`Value of wire 'a' after changing 'b' (2): ${a}`)
}

main()
