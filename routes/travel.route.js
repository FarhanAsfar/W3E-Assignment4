import { Router } from "express";
import { location } from "../controllers/location.js";  

const travelRouter = Router();


// defining routes
// api/v1/travel/...
travelRouter.route("/search/:locationname").get(location);

// travelRouter.get("/details/:id?", location);


export {travelRouter}