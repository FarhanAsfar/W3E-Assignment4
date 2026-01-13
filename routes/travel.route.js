import { Router } from "express";
import { locationSearch,detailsController } from "../controllers/locationSearch.controller.js";  

const travelRouter = Router();


// defining routes
// api/v1/travel/...
travelRouter.route("/search/:locationname").get(locationSearch);

travelRouter.route("/details/:id").get(detailsController);


export {travelRouter}