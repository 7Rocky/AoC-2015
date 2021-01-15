const main = require('./main')

const consoleSpy = jest.spyOn(console, 'log')

describe('AoC 2015 Problem 03', () => {
  it('should return correct results', async () => {
    await main()

    expect(consoleSpy).toHaveBeenCalledWith('Houses with at least one present (1): 2565')
    expect(consoleSpy).toHaveBeenCalledWith(
      'Houses with at least one present with Robo-Santa (2): 2639'
    )
  })
})
