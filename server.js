// server.js
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
    console.log(`
  ==========================================
  🚀 Incident Reporting Service Started
  ==========================================
  URL: http://${HOST}:${PORT}
  
  ⚠️  NOTE: Data is stored in memory.
      Restarting this server will clear all incidents.
  ==========================================
  `);
});
