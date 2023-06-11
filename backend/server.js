const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db')
const colors = require("colors");
const cors = require('cors')
const bodyParser = require("body-parser");


const userRoutes = require('./routes/userRouter')
const {errorHandler} = require('./middleware/errorMiddleware')

// Database Connection
connectDB(() => {
  try {
    console.log("Database Successfully Connected");
  } catch (error) {
    console.log("Database Not Connected: ", error);
  }
});

// Middlewares
app.use(cors())
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());


// Routes
app.use('/api/users',userRoutes)
app.use(errorHandler)


app.listen(port, () => console.log(`Server listening on port ${port}`));
