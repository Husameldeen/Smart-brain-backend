import { createClient } from '@supabase/supabase-js';

const db = createClient('https://vwjnjvwretfvnjuiqska.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3am5qdndyZXRmdm5qdWlxc2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MDk0NTMsImV4cCI6MjA3ODE4NTQ1M30.Jfe71yHobeakeQuMJVHEYiHkYJPF4db-RyevJD8Lumk')

// const { data, error } = await db
//   .from('users')
//   .select('*')

const handleImage = async (req, res, db) => {
    
    const { id } = req.body;
    //res.json(data)

    const { data, error } = await db
    .from('users')
    .select('entries')
    .eq('id', id)
    .single();

    if (fetchError || !user) {
        throw new Error(fetchError?.message || 'User not found');
    }

    const newPoints = user.entries + 1;

    res.json(newPoints)

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

}

export default handleImage;