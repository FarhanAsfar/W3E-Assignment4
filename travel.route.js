import { Router } from "express";

//import controller

const travelRouter = Router();


// api/v1/travel/...
// defining routes

travelRouter.get("/search/:locationname", location);

travelRouter.get("/details/:id", details);


export {travelRouter}