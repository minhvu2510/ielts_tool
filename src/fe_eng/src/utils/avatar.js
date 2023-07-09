import md5 from 'js-md5'

export function getGravatarUrl(email) {
  const GRAVATAR_URL = 'https://www.gravatar.com/avatar'
  return encodeURI(`${GRAVATAR_URL}/${md5(email)}?d=identicon&s=250`)
}
