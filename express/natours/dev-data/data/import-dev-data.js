const fs = require('fs');
const mongoose = require('mongoose');
const dotenv =require('dotenv');
dotenv.config({ path: '/home/dohroo/Desktop/main/FULL/UdemyNode/express/natours/.env' });
const Tour = require('../../models/tourModel');

// console.log(process.env);
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then(()=>{
    console.log('DB connected');
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf8'));

const importdata = async()=>{
    try{
        await Tour.create(tours);
        console.log('Data loaded successfully');
        process.exit();         
    }
    catch(err){
        console.log(err);
    }
}

const deletedata = async ()=>{
    try{
        await Tour.deleteMany();
        console.log('Data deleted successfully');
        process.exit();
    }
    catch(err){
        console.log(err);
    }
}
if(process.argv[2] === '--import'){
    importdata();
}
else if(process.argv[2] === '--delete'){
    deletedata();
}