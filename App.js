const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");


const PORT = process.env.PORT_NUMBER || 5000 ; //Port number

const connectDatabase = require("./config/database");

const app = express();

//  config
dotenv.config({path:"config/.env"});

// connecting database
connectDatabase();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

// Routes




app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})