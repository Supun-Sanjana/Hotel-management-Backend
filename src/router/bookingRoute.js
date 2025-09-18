import express from "express";
import { createBooking } from "../controller/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);

export default bookingRouter;