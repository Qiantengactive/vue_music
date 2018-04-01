import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getHotKey (disstid) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
