const mongoose = require('mongoose');

const { cookie: { name: chattCookieName } } = require('./settings');
const { getTtl } = require('./utils');
const User = require('./models/user');
const Session = require('./models/session');

const getUserInfo = async (cookies) => {
  let userInfo;
  try {
    let { [chattCookieName]: chattCookie } = cookies;
    if (chattCookie) {
      chattCookie = JSON.parse(chattCookie);
      console.log('look here => chattCookie', chattCookie);
      const updatedSession = await Session.findByIdAndUpdate(
        chattCookie?.sessionId, 
        { expiresAt: getTtl() }, // prolonging active session per each user request
        { new: true },
      );
  
      if (updatedSession) {
        userInfo = { ...chattCookie, sessionId: updatedSession._id.toString() };
        console.log('Updated User session:', userInfo);
      } else {
        console.log('User Session not found, need to perform a new login');
      }
    }
  } catch (error) {
    console.error('Chatt server Error: getUserInfo cannot parse user Cookies', error);
  }

  return userInfo;
}

const doLogin = async ({ username } = {}) => {
  let result, userId;

  try {
    if (!username) {
      throw new Error('no User name was provided')
    }
    const userDoc = { name: username };
    // const options = { upsert: true, new: true };
    let user = await User.findOne(userDoc);

    if (user) {
      // existing user
      // we need to check that there are no active sessions for the existing user
      // in the case when there's a session the user has either wait for existing session to expire or provide a new username for chatting
      const activeSession = await Session.findOne({ userId: user._id.toString() });
      if (activeSession) {
        console.log(`An active Session already exists for User [${user.name}]`);
        return result;
      }
      userId = user._id.toString();
    } else {
      // new user
      user = new User(userDoc);
      const newUser = await user.save();
      userId = newUser._id.toString();
    }
    // create new user's session
    const newSession = new Session({
      userId,
      expiresAt: getTtl(),
    });
    const savedSession = await newSession.save();
    result = { username, sessionId: savedSession._id.toString() };
  } catch (error) {
    console.error('Cannot perform user login', error);
  }

  return result;
}

module.exports = {
  getUserInfo,
  doLogin,
}