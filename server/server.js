const express = require('express');
const app = express()
require('dotenv').config();
const port = process.env.PORT || 5000
const dbConfig = require("./config/dbConfig") 
app.use(express.json())


const userRoute = require("./routes/usersRoutes");

app.use("/api/users", userRoute);
app.listen(port, () => {
  console.log(`Node JS server is running on port ${port}`)
})