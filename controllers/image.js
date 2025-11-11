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

const handleImage = async (req, res, db) => {
  const { id } = req.body;

  try {
    // 1. Get current entries
    const { data: user, error: fetchError } = await db
      .from('users')
      .select('entries')
      .eq('id', id)
      .single();

    if (fetchError || !user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const newEntries = (user.entries || 0) + 1;

    // 2. Update entries
    const { data: updated, error: updateError } = await db
      .from('users')
      .update({ entries: newEntries })
      .eq('id', id)
      .select('entries')
      .single();

    if (updateError) throw updateError;

    return res.json(updated.entries);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Unable to update entries' });
  }
};

export default handleImage;