const { createHash } = require('crypto')

const hashMD5 = input => createHash('MD5').update(input).digest('hex')

const mine = (input, zeroes, start = 1) => {
  const target = '0'.repeat(zeroes)
  let n = start - 1

  while (!hashMD5(input + ++n).startsWith(target));

  return n
}

const main = async () => {
  const input = 'yzbqklnj'

  const mined = mine(input, 5)

  console.log(`Mining number for 5 zeroes (1): ${mined}`)
  console.log(`Mining number for 6 zeroes (2): ${mine(input, 6, mined)}`)
}

main()

module.exports = main
