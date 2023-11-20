import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const UserKey = 'user_info';

export function getUserInfo() {
  const userInfo = Cookies.get(UserKey);
  return userInfo ? JSON.parse(userInfo) : null;
}

export function setUserInfo(userInfo) {
  Cookies.set(UserKey, JSON.stringify(userInfo));
}

export function removeUserInfo() {
  Cookies.remove(UserKey);
}
