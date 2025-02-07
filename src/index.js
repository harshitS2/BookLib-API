import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import connectDB from "./lib/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoute);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
})