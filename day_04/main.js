const crypto = require('crypto')

const hashMD5 = input => crypto.createHash('MD5').update(input).digest('hex')

const mine = (input, zeroes) => {
  const target = '0'.repeat(zeroes)
  let n = 0

  while (!hashMD5(input + ++n).startsWith(target));

  return n
}

const main = async () => {
  const input = 'yzbqklnj'

  console.log(`Mining number for 5 zeroes (1): ${mine(input, 5)}`)
  console.log(`Mining number for 6 zeroes (2): ${mine(input, 6)}`)
}

main()

module.exports = main
