const mongoose = require('mongoose');

const { cookie: { name: chattCookieName } } = require('./settings');
const { getTtl } = require('./utils');

let wsConnections = [];

const User = require('./models/user');
const Session = require('./models/session');
const Message = require('./models/message')

const setWS = wsConnection => {
  if (wsConnection) {
    wsConnections.push(wsConnection);
  }
}

const sendMessageToAllConnectedWsClients = (eventName, data) => {
  if (wsConnections.length && eventName && data) {
    try {
      for (const wsConnection of wsConnections) {
        wsConnection.send(JSON.stringify({ eventName, data }));
      }
      return true;
    } catch (error) {
      console.error('sendWebSocketMessage cannot send message', error);
    }
  }
  return false;
}

const getChattInfo = async (cookies) => {
  let chattInfo;
  try {
    let { [chattCookieName]: chattCookie } = cookies;
    if (chattCookie) {
      chattCookie = JSON.parse(chattCookie);
      const updatedSession = await Session.findByIdAndUpdate(
        chattCookie?.sessionId,
        { expiresAt: getTtl() }, // prolonging active session per each user request
        { new: true },
      );

      if (updatedSession) {
        chattInfo = { user: { ...chattCookie, sessionId: updatedSession._id.toString() }, messages: await Message.find() };
      } else {
        console.log('User Session not found, need to perform a new login');
      }
    }
  } catch (error) {
    console.error('Chatt server Error: getChattInfo', error);
  }

  return chattInfo;
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
    console.error('Chatt server Error: doLogin', error);
  }

  return result;
}

const uploadMessage = async (cookies, body) => {
  let result;

  try {
    let { [chattCookieName]: chattCookie } = cookies;
    const { message } = body || {};
    if (!message) {
      throw new Error('no message was sent')
    }
    if (chattCookie) {
      chattCookie = JSON.parse(chattCookie);
      const updatedSession = await Session.findByIdAndUpdate(
        chattCookie?.sessionId,
        { expiresAt: getTtl() }, // prolonging active session per each user request
        { new: true },
      );

      if (updatedSession) {
        const messageDoc = {
          message,
          username: chattCookie.username,
        };
        const newMessage = new Message(messageDoc);
        const newMessageResult = await newMessage.save();
        if (newMessageResult) {
          result = chattCookie;
          sendMessageToAllConnectedWsClients('newMessage', messageDoc);
        }
      } else {
        console.log('User Session not found, need to perform a new login');
      }
    }
  } catch (error) {
    console.error('Chatt server Error: uploadMessage', error);
  }

  return result;
}

module.exports = {
  getChattInfo,
  doLogin,
  uploadMessage,
  setWS,
}