const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/index');
const bodyParser = require('body-parser');
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cookieParser());

// Route setup
app.use('/api', router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
      app.listen(PORT, () => {
      console.log("Connected to MongoDB");
      console.log('Listening on port', PORT);
    });
  })
  .catch(error => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure code
  });

  