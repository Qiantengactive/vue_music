import axios from 'axios'
import { commonParams } from './config'

export function getLyric (mid) {
  const url = '/api/lyric'
  const data = Object({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 759768811,
    format: 'json'
  })
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}
