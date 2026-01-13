import express from "express";
import cors from "cors";
import { travelRouter } from "./routes/travel.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";


const app = express();

app.use(express.json());
app.use(cors());

//checking if server is running and can be reached
app.get("/health", (req, res) => {
    res.status(200).json({status: "OK"});
});

app.use("/api/v1/travel", travelRouter);

app.use(errorHandler);


export {app};