const chattCookieName = 'chattSession';

const getUserInfo = async (cookies = {}) => {
  const { [chattCookieName]: chattCookie } = cookies;
  let userInfo;

  if (chattCookie) {
    userInfo = { username: 'mikesilberg' };
  }

  return userInfo;
}

module.exports = {
  getUserInfo,
}