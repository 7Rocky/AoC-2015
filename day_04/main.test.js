const main = require('./main')

const consoleSpy = jest.spyOn(console, 'log')

describe('AoC 2015 Problem 04', () => {
  it('should return correct results', async () => {
    await main()

    expect(consoleSpy).toHaveBeenCalledWith('Mining number for 5 zeroes (1): 282749')
    expect(consoleSpy).toHaveBeenCalledWith('Mining number for 6 zeroes (2): 9962624')
  })
})
