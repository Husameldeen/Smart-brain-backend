// const saltRounds = 10;

// const handleSignup = (req, res, db, bcrypt) => {
//     const {email, name, password} = req.body;

//     if (!email || !name || !password) {
//         return res.status(400).json('Empty Fields!!!')
//     }
//     bcrypt.genSalt(saltRounds, function(err, salt) {
//         bcrypt.hash(password, salt, function(err, hash) {
//             db.transaction(trx => {
//                 trx.insert({
//                     hash: hash,
//                     email: email
//                 })
//                 .into('login')
//                 .returning('email')
//                 .then(loginEmail => {
//                     return trx('users')
//                         .returning('*')
//                         .insert({
//                             email: loginEmail[0].email,
//                             name: name,
//                             joined: new Date()
//                         })
//                         .then(user => res.json(user[0]))
//                 })
//                 .then(trx.commit)
//                 .catch(trx.rollback)
//             })
//             .catch(err => res.status(400).json('unable to register'))
//         });
//     });
// }

// export default handleSignup;


//import bcrypt from 'bcrypt';
//import supabase from './supabaseClient.js'; // your initialized Supabase client

const saltRounds = 10;

const handleSignup = async (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Empty fields!' });
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    // Insert into login table
    const { data: loginData, error: loginError } = await db
      .from('login')
      .insert([{ email, hash }])
      .select('email')
      .single();

    if (loginError) throw loginError;

    // Insert into users table
    const { data: userData, error: userError } = await db
      .from('users')
      .insert([
        {
          email: loginData.email,
          name,
          joined: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (userError) throw userError;

    return res.json(userData);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Unable to register' });
  }
};

export default handleSignup;
