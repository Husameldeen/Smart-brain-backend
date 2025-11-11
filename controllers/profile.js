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
