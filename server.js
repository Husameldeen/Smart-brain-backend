import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import handleSignup from './controllers/signup.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import handleImage from './controllers/image.js';
import handleApi from './controllers/api.js';
import { createClient } from '@supabase/supabase-js';

const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('Helloooooo Server is conected')});

app.post('/api', (req, res) => {handleApi(req, res)});

app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)})

app.post('/signup', (req, res) => {handleSignup(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

const PORT = process.env.port;

app.listen(PORT)