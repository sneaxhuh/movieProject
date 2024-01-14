const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = 3000

app.get("/",(req,res)=>{
    res.send("Bye World!")
})

app.listen(port, ()=>{
    console.log("app running on port: ",port)
})