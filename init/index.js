const express=require("express");
const app=express();
const Project=require("../models/Project"); 
const initData=require("./projectdata.js");
const mongoose=require("mongoose");
const Client = require("../models/Client.js");
const initData2 =require("./clientdata.js");


main()
.then(()=>{
    console.log("connected to db");
    
})
.catch(err => console.log(err));

async function main() {
 await mongoose.connect('mongodb://127.0.0.1:27017/landingpage');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// const initDb= async ()=>{
//   console.log("Raw imported data:", initData);          // ✅ Debug step 1
//   console.log("Array to insert:", initData.data);
//    await Project.deleteMany({});
//    await Project.insertMany(initData.data);
//    console.log("data was initialized");
   
// }

// initDb();

// const initDb= async ()=>{
//   console.log("Raw imported data:", initData);          // ✅ Debug step 1
//   console.log("Array to insert:", initData.data);
//    await Project.deleteMany({});
//    await Project.insertMany(initData.data);
//    console.log("data was initialized");
   
// }

// initDb();

const initDb= async ()=>{
  console.log("Raw imported data:", initData2);          // ✅ Debug step 1
  console.log("Array to insert:", initData2.data2);
   await Client.deleteMany({});
   await Client.insertMany(initData2.data2);
   console.log("data was initialized");
   
}

initDb();

