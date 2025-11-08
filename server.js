import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import handleSignup from './controllers/signup.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import handleImage from './controllers/image.js';
import handleApi from './controllers/api.js';
import { createClient } from '@supabase/supabase-js';
import postgres from 'postgres';

// Create a single supabase client for interacting with your database
//const db = createClient('https://vwjnjvwretfvnjuiqska.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3am5qdndyZXRmdm5qdWlxc2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MDk0NTMsImV4cCI6MjA3ODE4NTQ1M30.Jfe71yHobeakeQuMJVHEYiHkYJPF4db-RyevJD8Lumk')


const connectionString = 'https://vwjnjvwretfvnjuiqska.supabase.co'
const sql = postgres(connectionString)

// const db = knex({
//   client: 'pg',
//   connection: {
//     host: '127.0.0.1',
//     user: 'postgres',
//     password: '0995644304',
//     database: 'smart-brain'
//   },
// });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send("It's Working")});

app.post('/api', (req, res) => {handleApi(req, res)});

app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)})

app.post('/signup', (req, res) => {handleSignup(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

const PORT = process.env.port;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})