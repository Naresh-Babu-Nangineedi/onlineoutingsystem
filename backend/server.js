const express = require("express")
const dbConnection = require("./config/db")
const hostelInchargeRoutes = require("./routes/hostelInchargeRoutes")
const userRoutes = require("./routes/userRoutes") 
const outingRoutes = require("./routes/outingRoutes")
const app=express()

//DB Connection
dbConnection()

//Middleware
app.use(express.json())

const PORT = 5000



app.use("/api/hostelIncharge",hostelInchargeRoutes)
app.use("/api/user/",userRoutes)
app.use("/api/outing/",outingRoutes)

app.get("/test",(req,res)=>{
    res.send("API Works...")
})

app.listen(PORT,()=>{
    console.log(`Server Running running on ${PORT}`)
})