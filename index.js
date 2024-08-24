const express = require('express');
const cron = require('node-cron');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

const endpoint = process.env.API_ENDPOINT_HEALTH_CHECK;

function healthCheck() {
  console.log(`Running health check at ${new Date().toISOString()}`);

  fetch(endpoint)
    .then((res) => res.json())
    .then((json) => console.log(`Health check ok, message: ${JSON.stringify(json)}`))
    .catch((error) => console.log(`Health check error: ${error.message}`));
}

cron.schedule('*/10 * * * * *', healthCheck);

app.get('/', (req, res) => {
  res.send('Health check job is running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  healthCheck();
});
