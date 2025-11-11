
const handleApi = async (req, res) => {
  const IMAGE_URL = req.body.imageUrl;
  const PAT = process.env.PAT;
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '5e026c5fae004ed4a83263ebaabec49e';

  const raw = JSON.stringify({
    user_app_id: { user_id: USER_ID, app_id: APP_ID },
    inputs: [{ data: { image: { url: IMAGE_URL } } }]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  const response = await fetch(
    `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
    requestOptions
  );
  const data = await response.json();
  res.json(data);
}

export default handleApi;