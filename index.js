const express=require('express')
const mongoose = require('mongoose');
const cors = require('cors')


const app=express()
app.use(express.json())
app.use(cors())
const mongoUrl= "mongodb://localhost:27017/dashboard"

mongoose.connect(mongoUrl).then(() =>{
    console.log('Connected DB')  
    app.listen(5000,()=>{
        console.log('Server Running at http://localhost:5000')  
      })
})
.catch((error) =>{
    console.log("ERROR", error);
})

const listSchema = new mongoose.Schema({
    id: Number,
    title: String,
    url: String,
    icon: String
})

const menuSchema = new mongoose.Schema({
    id: Number,
    title: String,
    listItems: [listSchema]
})
const menuModel = mongoose.model("menu", menuSchema)

app.get('/menu', async (req,res) => {
   
    const menuData = await menuModel.find()
 console.log("menu", menuData)
   res.json(menuData)
})

const TopdealersSchema = new mongoose.Schema({
    id: Number,
    img: String,
    username: String,
    email: String,
    amount: String

})
const TopdealersModel = mongoose.model("topdealers", TopdealersSchema)

app.get('/topdealers', async (req,res) => {
   
    const topdealersData = await TopdealersModel.find()
 
   res.json(topdealersData)
})