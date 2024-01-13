const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // req object is typically contained within a context object passed to resolver functions. 
  authMiddleware: function ({ req }) {
    const authorizationHeader = req.headers.authorization || '';
    // checks if the authorization header starts with 'Bearer ' to verify that it contains a JWT token. 
    let token = '';

    if (authorizationHeader.startsWith('Bearer ')) {
      token = authorizationHeader.substring(7); // remove 'Bearer ' prefix
    }

    if (!token) {
      throw new Error('You have no token!');
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      //if the token is missing or invalid, it throws an error.
      throw new Error('Invalid token');
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};