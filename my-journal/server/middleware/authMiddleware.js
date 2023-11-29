const jwt = require('jsonwebtoken');

const authenticate = async (ctx, next) => {
  const token = ctx.headers.authorization;

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized - Missing Token' };
    return;
  }

  try {
    const tokenWithoutBearer = token.replace(/^Bearer\s/, '');

    const decoded = jwt.verify(tokenWithoutBearer, 'my-secret-key'); 

    ctx.state.user = decoded;

    await next();
  } catch (error) {
    console.error('Error verifying token:', error);

    ctx.status = 401;
    ctx.body = { error: 'Unauthorized - Invalid Token' };
  }
};

module.exports = { authenticate };
