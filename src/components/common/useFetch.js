import axios from 'axios'

const baseURL = 'http://localhost:1234/'

export function useFetch(module, config,) {
  const url = module ? `${baseURL}${module}/` : baseURL
  const authAxios = axios.create({
    baseURL: url,
    ...config,
  })

  authAxios.interceptors.request.use(
    config => {
      // tslint:disable-next-line: no-object-mutation
      return config
    },
    error => {
      return Promise.reject(error)
    },
  )
  authAxios.interceptors.response.use(
    response => response,
    error => {
      if (error.message === 'Request failed with status code 401') {
        return Promise.reject(error)
      }
      return Promise.reject(error)
    },
  )

  return { authAxios, baseURL: url }
}
