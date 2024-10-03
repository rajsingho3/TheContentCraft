const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const app = express();
const client = new OAuth2Client('33157572429-io4s5e7oj3p42i9evbrc0g6k8n7isj1t.apps.googleusercontent.com');

app.use(bodyParser.json());

app.post('/google-signup', async (req, res) => {
  const token = req.body.token;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: '33157572429-io4s5e7oj3p42i9evbrc0g6k8n7isj1t.apps.googleusercontent.com',
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];

  // create a new user or update an existing user in your database
  res.json({ userid });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});