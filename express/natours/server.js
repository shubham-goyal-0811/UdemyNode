const PORT = process.env.port || 3000;
const mongoose = require('mongoose');
const dotenv =require('dotenv');
dotenv.config({path:".env"});
const app = require('./app');

// console.log(process.env);
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{useNewUrlParser: true,
    useUnifiedTopology: true}).then(()=>{
    console.log('DB connected');
});


app.listen(PORT, ()=>{
    console.log(`App running on Port:- ${PORT}`);
});