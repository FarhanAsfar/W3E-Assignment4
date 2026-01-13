import { Router } from "express";
import { locationSearch } from "../controllers/locationSearch.controller.js";  

const travelRouter = Router();


// defining routes
// api/v1/travel/...
travelRouter.route("/search/:locationname").get(locationSearch);

// travelRouter.get("/details/:id?", location);


export {travelRouter}