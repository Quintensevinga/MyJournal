const jwt = require('jsonwebtoken');

const authenticate = async (ctx, next) => {
  const token = ctx.headers.authorization;

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized - Missing Token' };
    return;
  }

  try {
    const decoded = jwt.verify(token, 'my-secret-key'); 

    ctx.state.user = decoded;

    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized - Invalid Token' };
  }
};

module.exports = { authenticate };
