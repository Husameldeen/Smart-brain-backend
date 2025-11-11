// const handleImage = async (req, res, db) => {
    
//     const { id } = req.body;

//     const { data, error } = await db
//     .from('users')
//     .select('entries')
//     .eq('id', id)
//     .single();

//     const newPoints = data.entries + 1;

//     res.json(newPoints)

//     const { newEntries, error: updateError } = await db
//     .from('users')
//     .update({ entries: newPoints })
//     .eq('id', id)
//     .select();

//     res.json(newEntries)
// }

// export default handleImage;

//import supabase from './supabaseClient.js';

const handleImage = async (req, res, db) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing user id' });
  }

  try {
    // Update user's entries and return the new value
    const { data, error } = await db
      .from('users')
      .update({ entries: db.rpc('increment', { x: 1 }) }) // placeholder for clarity; see note below
      .eq('id', id)
      .select('entries')
      .single();

    if (error || !data) {
      return res.status(400).json({ error: 'Unable to update entries' });
    }

    return res.json(data.entries);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

export default handleImage;
