import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

//in questo caso se si disconnette prova a connettersi di nuovo
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

//middlewares
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", usersRoute);
app.use("/api/users", roomsRoute);

//i parametri devono essere passati con questo ordine o non funzionerà
app.use((err, req, res, next)=>{
    const errorStauts = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStauts).json({
        success : false,
        status : errorStauts,
        message: errorMessage,
        stack: err.stack,
    })
})


// app.get("/", (req, res)=>{
//     res.send("hello first request")
// })

app.listen(8800, () => {
  connect();
  console.log("connected to back end");
});
