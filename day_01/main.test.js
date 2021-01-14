const main = require('./main')

const consoleSpy = jest.spyOn(console, 'log')

describe('AoC 2015 Problem 01', () => {
  it('should return correct results', async () => {
    await main()

    expect(consoleSpy).toHaveBeenCalledWith("Santa's floor (1): 232")
    expect(consoleSpy).toHaveBeenCalledWith(
      'First position where Santa enters the basement (2): 1783'
    )
  })
})
