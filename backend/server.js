// common js

import express from 'express';
import connectDB from './config/db.js';
import chalk from 'chalk';
import { registerUser } from './controller/userController.js';

const app = express();
const PORT = 8000;

app.use(express.json());

app.post('/api/register-user', registerUser);

connectDB();

app.listen(PORT, () => {
    console.log(`${chalk.green.bold('server')} listening on ${PORT}`);
});