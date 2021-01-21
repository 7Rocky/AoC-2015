const lookAndSay = string => {
  let lastChar = string[0]
  let count = 1
  let result = ''
  let i = 1

  for (; i < string.length; i++) {
    if (string[i] === lastChar) {
      count++
    } else {
      result += count + lastChar
      lastChar = string[i]
      count = 1
    }
  }

  if (string[i] !== lastChar) {
    result += count + lastChar
  }

  return result
}

const process = (string, times) => {
  for (let i = 0; i < times; i++) {
    string = lookAndSay(string)
  }

  return string.length
}

const main = () => {
  const input = '1113122113'

  console.log(`Look-and-say 40 times (1): ${process(input, 40)}`)
  console.log(`Look-and-say 50 times (2): ${process(input, 50)}`)
}

main()
