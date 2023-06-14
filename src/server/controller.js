const { cookie: { name: chattCookieName } } = require('./settings');

const getUserInfo = async (cookies) => {
  let userInfo;
  try {
    const { [chattCookieName]: chattCookie } = cookies;
    if (chattCookie) {
      userInfo = JSON.parse(chattCookie);
    }
  } catch (error) {
    console.error('Chatt server Error: getUserInfo cannot parse user Cookies', error);
  }

  return userInfo;
}

const doLogin = async ({ username } = {}) => {
  let result;
  if (username) {
    result = { username, sessionId: 12345 };
  }

  return result;
}

module.exports = {
  getUserInfo,
  doLogin,
}