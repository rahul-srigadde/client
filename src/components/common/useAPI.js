import { useContext } from 'react'
import { loaderContext, toastContext } from '../../App'
import { useFetch } from './useFetch'

export const useAPI = () => {
  const showLoader = useContext(loaderContext)
  const renderToast = useContext(toastContext)
  const { authAxios } = useFetch()

  const doCall = async (payload) => {
    if (!payload.hideLoader) {
      showLoader(true)
    }
    const data = await new Promise(async (resolve, rej) => {
      try {
        const res = await authAxios.request({ ...payload })
        // handling success response
        if (
          (res.data.hasOwnProperty('failureCount') &&
            res.data.failureCount === 0) ||
          res.data.status === 'success'
        ) {
          handleSuccess(payload)
          resolve(res.data)
        } else {
          rej({ error: true, message: res })
        }
      } catch (error) {
        rej({ error: true, message: error })
      }
    }).catch(async e => handleError(e, payload))
    return data
  }

  const handleSuccess = (payload) => {
    if (!payload.hideLoader) {
      showLoader(false)
    }
    if (payload.successMessage) {
      renderToast('success', payload.successMessage, true)
    }
  }

  const handleError = async (e, payload) => {
    // handling failure response
    if (!payload.hideLoader) {
      showLoader(false)
    }
    let msg = 'Something Went Wrong'
    if (e?.message?.response?.data?.errors?.message) {
      msg = e?.message?.response?.data?.errors?.message
    }
    if (e?.message?.data?.data?.errors?.message) {
      msg = e?.message?.data?.data?.errors?.message
    }

    if (e?.message?.data?.data?.length) {
      e.message.data.data.forEach((res) => {
        if (res.status === 'failure') {
          msg = res.error.message
        }
      })
    }

    if (!payload.hideError) {
      renderToast('error', msg, true)
    }
    return Promise.reject({ error: true, message: e })
  }

  return { doCall }
}
