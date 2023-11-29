const User = require('../model').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = async (ctx) => {
    try {
      const { username, password } = ctx.request.body;
      console.log(username);
      console.log(password);

      const existingUser = await User.findOne({ username });

      if (existingUser) {
        ctx.status = 400;
        ctx.body = { error: 'Username already exists' };
        return;
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id, username: newUser.username }, 'my-secret-key', {
        expiresIn: '1d',
      });

      ctx.status = 200;
      ctx.body = { token };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  }

  const login = async (ctx) => {
    try {
      const { username, password } = ctx.request.body;

      const user = await User.findOne({ username });

      if (!user || user.password !== password) if (!user || !(await bcrypt.compare(password, user.password))) {
        ctx.status = 401;
        ctx.body = { error: 'Invalid username or password' };
        return;
      }

      const token = jwt.sign({ userId: user._id, username: user.username }, 'my-secret-key', {
        expiresIn: '1d', 
      });

      console.log(token);
      ctx.status = 200;
      ctx.body = { token };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  }

module.exports = { register, login };
