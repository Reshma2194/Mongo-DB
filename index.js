let express = require("express");
let mongoose = require("mongoose");
let bodyparser = require("body-parser");
let Course = require("./models/Course");

let app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mydb").then(()=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log("Error:" + err);
});

app.get("/", (req, res)=>{
    res.send("Welcome");
});

app.post("/savecourse", async(req, res)=>{
    let data = req.body.data;    
    if(data.id == "")
    {
        let course = new Course({name:data.name, description:data.description});
        let reply = await course.save();
        res.send(reply);
        // course.save().then(
        //     (result)=>{
        //         res.send(result);
        //     },
        //     (error)=>{
        //         res.send(err);
        //     }
        // );
    }
    else{
        let reply = await Course.findByIdAndUpdate(data.id, data);
        res.send(reply);
    }    
});

app.post("/listcourses", async(req, res)=>{
    let reply = await Course.find();
    res.send(reply);
});

app.post("/getcourse", async(req, res)=>{
    let data = req.body.data;
    let reply = await Course.findById(data.id);    
    res.send(reply);
});

app.post("/deletecourse", async(req, res)=>{
    let data = req.body.data;
    let reply = await Course.findByIdAndDelete(data.id);
    res.send(reply);
});

app.listen(8081, ()=>{
    console.log("API running on 8081");
})