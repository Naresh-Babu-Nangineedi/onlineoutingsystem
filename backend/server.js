const express = require("express")
const dbConnection = require("./config/db")
const hostelInchargeRoutes = require("./routes/hostelInchargeRoutes")

const app=express()

//DB Connection
dbConnection()

//Middleware
app.use(express.json())

const PORT = 5000



app.use("/api/hostelIncharge",hostelInchargeRoutes)


app.get("/test",(req,res)=>{
    res.send("API Works...")
})

app.listen(PORT,()=>{
    console.log(`Server Running running on ${PORT}`)
})