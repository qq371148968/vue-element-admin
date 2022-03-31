import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // 设置cookie的失效时间，默认60分钟
  const num = 60 // 分钟
  const time = new Date(new Date().getTime() + num * 60 * 1000)
  return Cookies.set(TokenKey, token, { expires: time })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
