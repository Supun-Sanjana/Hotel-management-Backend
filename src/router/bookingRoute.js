import express from "express";
import {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking
} from "../controller/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);           // Create
bookingRouter.get("/", getAllBookings);           // Read all
bookingRouter.get("/:id", getBookingById);        // Read single
bookingRouter.put("/:id", updateBooking);         // Update
bookingRouter.delete("/:id", deleteBooking);      // Delete

export default bookingRouter;
