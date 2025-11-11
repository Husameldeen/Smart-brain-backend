const handleImage = async (req, res, db) => {
    
    const { id } = req.body;

    const { data, error } = await db
    .from('users')
    .select('entries')
    .eq('id', id)
    .single();

    const newPoints = data.entries + 1;

    res.json(newPoints)

    const { newEntries, error: updateError } = await db
    .from('users')
    .update({ entries: newPoints })
    .eq('id', id)
    .select();

    res.json(newEntries)
}

export default handleImage;