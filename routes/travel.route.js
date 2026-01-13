import { Router } from "express";
import { locationSearch,detailsController } from "../controllers/locationSearch.controller.js";

import { verifyToken } from "../middlewares/token.js";

const travelRouter = Router();


// defining routes
// api/v1/travel/...
travelRouter.route("/search/:locationname").get(verifyToken,locationSearch);

travelRouter.route("/details/:id").get(verifyToken,detailsController);


export {travelRouter}