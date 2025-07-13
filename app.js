

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Project = require("./models/Project.js");
const Client = require("./models/Client.js");
const Contact = require("./models/Contact.js");
const Subscription = require("./models/Subscription.js");
const path = require("path");
const methodOverride = require("method-override");



app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));  // for parsing data
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public"))); // using static files



main()
.then(()=>{
    console.log("connected to db");
    
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/landingpage');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get("/", async(req,res)=>{
     const projects = await Project.find({});
     const clients=await Client.find({});
     console.log(projects);
    res.render("index", {projects ,clients});
})



app.use("/admin", (req, res, next) => {
    let { token } = req.query;
    if (token === "giveaccess") {
        return next();  // Important!
    } 
    res.send("ACCESS DENIED!");
});

app.get("/admin", async (req, res) => {
    try {
        const projects = await Project.find({});
        const clients = await Client.find({});
        const contacts = await Contact.find({});
        const subscribers = await Subscription.find({});

        res.render("admin", { projects, clients, contacts, subscribers });
    } catch (err) {
        console.error("Error fetching admin data:", err);
        res.status(500).send("Something went wrong.");
    }
});






// app.get("/testlisting" , async (req,res)=>{
//     let sampleTesting = new Project({
//         image: "./photo/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg"   ,
//         name: "vivek o",
//   description: "desgining"
//     });
//     await sampleTesting.save();
//     console.log(sampleTesting);
//     res.send("sample saved");
// });



app.listen(8080,()=>{
    console.log(`server listen on port 8080`);
    
});