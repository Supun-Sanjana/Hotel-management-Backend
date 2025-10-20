import express from "express";
import {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    getBookingByDate,
    createBookingByCategory,
    updateStatus,
    getAvailableRoomsByDateAndCategory,
    getUserBookings
} from "../controller/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);           // Create
bookingRouter.get("/get-all", getAllBookings);           // Read all
bookingRouter.get("/:id", getBookingById);        // Read single
bookingRouter.put("/:id", updateBooking);         // Update
bookingRouter.delete("/:id", deleteBooking);      // Delete
bookingRouter.get('/byEmail/:email', getUserBookings)

bookingRouter.post("/filter-date", getBookingByDate)

bookingRouter.post("/create-by-category", createBookingByCategory)

bookingRouter.put("/update-status/:id", updateStatus);

bookingRouter.post("/filter-available", getAvailableRoomsByDateAndCategory);


export default bookingRouter;
