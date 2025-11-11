
// const handleSignup = (req, res, db, bcrypt) => {
//     const {email, password} = req.body;

//     if (!email || !password) {
//         return res.status(400).json('Empty Fields!!!')
//     }
//     db.select('email', 'hash').from('login')
//     .where('email', '=', email)
//     .then(data => {
//         bcrypt.compare(password, data[0].hash, function(err, result) {
//             if (result) {
//                 return db.select('*').from('users')
//                 .where('email', '=', email)
//                 .then(user => res.json(user[0]))
//                 .catch(err => res.status(400).json('unable to get user'))
//             } else {
//                 res.status(400).json('wrong email or password') 
//             }
//         });
//     })
// }

// export default handleSignup;

//import bcrypt from 'bcrypt';
//import supabase from './supabaseClient.js'; // your Supabase client instance

const handleSignin = async (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Empty fields!' });
  }

  try {
    // 1. Get stored hash from login table
    const { data: loginData, error: loginError } = await db
      .from('login')
      .select('hash')
      .eq('email', email)
      .single();

    if (loginError || !loginData) {
      return res.status(400).json({ error: 'Wrong email or password' });
    }

    // 2. Compare passwords
    const valid = await bcrypt.compare(password, loginData.hash);
    if (!valid) {
      return res.status(400).json({ error: 'Wrong email or password' });
    }

    // 3. Fetch user data from users table
    const { data: userData, error: userError } = await db
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      return res.status(400).json({ error: 'Unable to get user' });
    }

    // 4. Return user info
    return res.json(userData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

export default handleSignin;
