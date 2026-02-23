import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})) //.use is used for all middlewares and configurations

app.use(express.json({limit: "16kb"})) // this means we accept json upto limit 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"})) // take data from url
app.use(express.static("public")) // as we want to store any image pdf for ourself
app.use(cookieParser()) // server se user ke browser ki cookies access krna and cookies ko set krna to perform CRUD operation

export {app}