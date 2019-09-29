import { Model } from './model'

describe('Data model operations', () => {
  const dataSet = {
    p24_test: 'test',
    p24_test_2: 'test2'
  }

  test('Check if set new item correctly', () => {
    const model = (new Model()).set('p24_test', 'test')

    expect(model.dump()).toEqual({
      p24_test: 'test'
    })
  })

  test('Check if set many new items correctly', () => {
    const model = (new Model()).setMany(dataSet)

    expect(model.dump()).toEqual(dataSet)
  })

  test('Check if set many new item through constructor correctly', () => {
    const model = new Model(dataSet)

    expect(model.dump()).toEqual(dataSet)
  })
})
