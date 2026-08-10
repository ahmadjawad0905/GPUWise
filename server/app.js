const express = require('express');
const cors = require('cors');
const router = require('./routes/gpuRoutes');

const app = express();
app.use(cors());

app.use('/api', router);

module.exports = app;