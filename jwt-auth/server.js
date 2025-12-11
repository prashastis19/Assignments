require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const users = [];

// REGISTER ROUTE 
app.get('/register', async (req, res) => {
    const { email, password } = req.query;
    if (!email || !password) return res.send('Email and password are required');

    if (users.find(u => u.email === email)) return res.send('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.send('User registered successfully');
});

// LOGIN ROUTE 
app.get('/login', async (req, res) => {
    const { email, password } = req.query;
    if (!email || !password) return res.send('Email and password are required');

    const user = users.find(u => u.email === email);
    if (!user) return res.send('Invalid email or password');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send('Invalid email or password');

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '10m' });
    res.send(token);
});

//  PROTECTED INVOKE ROUTE 
app.get('/invoke', (req, res) => {
    const { token } = req.query;
    if (!token) return res.send('Access denied');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.send('Access denied');
        res.send('Function invoked successfully');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
