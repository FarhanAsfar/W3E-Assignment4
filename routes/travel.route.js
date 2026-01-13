import { Router } from "express";
import { location } from "../controllers/location.js";  

const travelRouter = Router();


// api/v1/travel/...
// defining routes

travelRouter.route("/search/:locationname").get(location);

// travelRouter.get("/details/:id?", location);


export {travelRouter}