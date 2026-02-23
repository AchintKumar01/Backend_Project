// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config()


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!!", err);
})









/* approach to connect to the DB

import express from "express";

const app = express()

( async() =>{ //IFFI function immediately executed
    try{
        await mongoose.connect(`${process.env.MONDODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{ // if DB connected but problem in express then we will handle like this using a listener
            console.log("ERROR: ", error)
            throw error
        }) //listener

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })

    } catch(error){
        console.error("ERROR:", error)
        throw error
    }
})()
*/