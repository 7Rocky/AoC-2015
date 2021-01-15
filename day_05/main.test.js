const main = require('./main')

const consoleSpy = jest.spyOn(console, 'log')

describe('AoC 2015 Problem 05', () => {
  it('should return correct results', async () => {
    await main()

    expect(consoleSpy).toHaveBeenCalledWith('Nice strings (1): 236')
    expect(consoleSpy).toHaveBeenCalledWith('Nice strings (2): 51')
  })
})
