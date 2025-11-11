
// const handleProfileGet = (req, res, db) => {
//     const { id } = req.params;
//     db.select('*').from('users').where({
//             id: id
//         })
//         .then(user => {
//             if (user.length) {
//                 res.json(user)
//             } else {
//                 res.status(400).json('not found');
//             }
//         })
//         .catch(err => res.status(400).json('not found'))
// }

// export default handleProfileGet;

//import supabase from './supabaseClient.js';

const handleProfileGet = async (req, res, db) => {
  const { id } = req.params;

  try {
    // Query Supabase users table
    const { data: user, error } = await db
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

export default handleProfileGet;
