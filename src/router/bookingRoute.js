import express from "express";
import {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    getBookingByDate,
    createBookingByCategory
} from "../controller/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);           // Create
bookingRouter.get("/", getAllBookings);           // Read all
bookingRouter.get("/:id", getBookingById);        // Read single
bookingRouter.put("/:id", updateBooking);         // Update
bookingRouter.delete("/:id", deleteBooking);      // Delete

bookingRouter.post("/filter-date", getBookingByDate)

bookingRouter.post("/create-by-category", createBookingByCategory)

export default bookingRouter;
