const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors');
//  config
dotenv.config({path:"config/.env"});


const PORT = process.env.PORT_NUMBER || 5000 ; //Port number

const connectDatabase = require("./config/database");

const app = express();

// connecting database
connectDatabase();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

// Routes
const requirement = require("./routes/requirmentRoutes")
app.use("/api/v1",requirement)

const user = require("./routes/userRoutes")
app.use("/api/v1/users",user)


app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})