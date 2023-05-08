const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDatabase = ()=>{
    mongoose.connect("mongodb+srv://sherinrobert1952:K5qFcytSyx8tz7iB@cluster0.juoujt3.mongodb.net/ICTAKCurriculumDB?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true
          }).then((data)=>{
            console.log(`MongoDB connected with the server: ${data.connection.host}`);
        });
}

module.exports = connectDatabase;