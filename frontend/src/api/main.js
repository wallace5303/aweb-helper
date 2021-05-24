import request from '@/utils/request'
import storage from 'store'
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'

const mainApi = {
  outApi: '/v1/outApi'
}

/**
 * outApi
 */
export function outApi (parameter) {
  parameter.data.token = storage.get(ACCESS_TOKEN)
  parameter.data.uid = storage.get(USER_INFO) ? storage.get(USER_INFO).uid : ''
  return request({
    url: mainApi.outApi,
    method: 'post',
    data: parameter
  })
}
