const express = require('express');
const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');
const app = express();
const PORT = 3000;

const users = [];

function signup(email, password) {
  const salt = randomBytes(16).toString('hex');
  const hashedPassword = scryptSync(password, salt, 64).toString('hex');
  const user = { email, password: `${salt}:${hashedPassword}` };
  users.push(user);
  return user;
}

function login(email, password) {
  const user = users.find(v => v.email === email);
  if (!user) {
    return 'user not found';
  }

  const [salt, key] = user.password.split(':');
  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, 'hex');
  const match = timingSafeEqual(hashedBuffer, keyBuffer);

  if (!match) {
    return 'login failure!';
  }
  return 'login success!';
}

app.use(express.json());

// Signup endpoint
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const user = signup(email, password);
  res.json({ message: 'User signed up successfully', user });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const loginResult = login(email, password);
  res.json({ message: loginResult });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
