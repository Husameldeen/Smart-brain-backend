
const handleImage = (req, res, db) => {
    const { id } = req.body;
    res.json(id)
    //console.log('id = ', id)
    // db('users').where('id', '=', id)
    // .increment('entries', 1)
    // .returning('entries')
    // .then((entries) => {
    //     //console.log('entries = ', entries[0])
    //     res.json(entries[0])
    // })
    // .catch(err => res.status(400).json('unable to get entries'))

    // incrementUserPoints.js

    function incrementUserPoints(id, incrementBy = 1) {
    // Step 1: Fetch current value
    const { data: user, error: fetchError } = db
        .from('users')
        .select('entries')
        .eq('id', id)
        .single();

    if (fetchError || !user) {
        throw new Error(fetchError?.message || 'User not found');
    }

    const newPoints = user.points + incrementBy;

    // Step 2: Update value
    const { data: updatedUser, error: updateError } = db
        .from('users')
        .update({ entries: newPoints })
        .eq('id', id)
        .select();

    if (updateError) throw new Error(updateError.message);

    return updatedUser[0];
    }
    res.json(updatedUser[0])

}

export default handleImage;