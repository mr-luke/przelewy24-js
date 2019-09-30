import axios from 'axios'
import Http from './http'
import { Model } from '../model'

jest.mock('axios')
const mocked = axios as jest.Mocked<typeof axios>

describe('Http service tests', () => {
  const dataSet = new Model({ test: 'test'})

  test('Check if success http call respond correctly', () => {
    mocked.request.mockResolvedValue({
      status: 200,
      data: 'error=0&param1=test&param2='
    })

    return expect(
      Http.request({url: 'test', data: dataSet})
    ).resolves.toEqual({
      status: 200,
      success: true,
      data: {
        error: '0',
        param1: 'test',
        param2: ''
      }
    })
  })

  test('Check if non-success http call respond correctly', () => {
    mocked.request.mockResolvedValue({
      status: 200,
      data: 'error=err1&errorMessage=Something+went+wrong'
    })

    return expect(
      Http.request({url: 'test', data: dataSet})
    ).resolves.toEqual({
      status: 200,
      success: false,
      data: {
        error: 'err1',
        errorMessage: 'Something went wrong'
      }
    })
  })

  test('Check if error http call respond correctly', () => {
    mocked.request.mockRejectedValue({
      response: { status: 500 }
    })

    return expect(
      Http.request({url: 'test', data: dataSet})
    ).resolves.toEqual({
      status: 500,
      success: false
    })
  })
})
