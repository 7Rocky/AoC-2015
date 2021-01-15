const main = require('./main')

const consoleSpy = jest.spyOn(console, 'log')

describe('AoC 2015 Problem 02', () => {
  it('should return correct results', async () => {
    await main()

    expect(consoleSpy).toHaveBeenCalledWith('Total wrapping paper surface (1): 1598415')
    expect(consoleSpy).toHaveBeenCalledWith('Total feets of ribbon (2): 3812909')
  })
})
