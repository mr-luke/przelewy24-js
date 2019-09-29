import axios from 'axios'
import Http from './http'

jest.mock('axios')
const mocked = axios as jest.Mocked<typeof axios>

describe('Http service tests', () => {
  test('Check if success http call respond correctly', () => {
    mocked.request.mockResolvedValue({
      status: 200,
      data: 'error=0&param1=test&param2=ok'
    });

    Http.request({method: 'POST', url: 'test', data: 'test'}).then(response => {
      expect(response).toEqual({
        status: 200,
        success: true,
        data: {
          error: '0',
          param1: 'test',
          param2: 'ok'
        }
      })
    })
  })

  test('Check if non-success http call respond correctly', () => {
    mocked.request.mockResolvedValue({
      status: 200,
      data: 'error=err1&errorMessage=Something+went+wrong'
    });

    Http.request({method: 'POST', url: 'test', data: 'test'}).then(response => {
      expect(response).toEqual({
        status: 200,
        success: false,
        data: {
          error: 'err1',
          errorMessage: 'Something went wrong'
        }
      })
    })
  })

  test('Check if error http call respond correctly', () => {
    mocked.request.mockRejectedValue({
      response: { status: 500 }
    });

    Http.request({method: 'POST', url: 'test', data: 'test'}).then(response => {
      expect(response).toEqual({
        status: 500,
        success: false
      })
    })
  })
})
