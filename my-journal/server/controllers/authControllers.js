const User = require('../models').User;
const jwt = require('jsonwebtoken');

const authController = {
  register: async (ctx) => {
    try {
      const { username, password } = ctx.request.body;

      const existingUser = await User.findOne({ username });

      if (existingUser) {
        ctx.status = 400;
        ctx.body = { error: 'Username already exists' };
        return;
      }

      const newUser = new User({ username, password });
      await newUser.save();

      ctx.status = 200;
      ctx.body = { message: 'User registered successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  },

  login: async (ctx) => {
    try {
      const { username, password } = ctx.request.body;

      const user = await User.findOne({ username });

      if (!user || !user.comparePassword(password)) {
        ctx.status = 401;
        ctx.body = { error: 'Invalid username or password' };
        return;
      }

      const token = jwt.sign({ userId: user._id, username: user.username }, 'my-secret-key', {
        expiresIn: '1d', 
      });

      ctx.status = 200;
      ctx.body = { token };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  },
};

module.exports = authController;
