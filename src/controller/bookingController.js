import Booking from "../model/booking.js";
import { isCustomerValid } from "./userController.js";

// ✅ Create Booking (Already done)
export function createBooking(req, res) {
    if (!isCustomerValid(req)) {
        return res.status(403).json({ message: "Forbidden" });
    }

    let startingId = 200;

    Booking.findOne().sort({ bookingId: -1 }) // get last booking
        .then((lastBooking) => {
            const newId = lastBooking ? lastBooking.bookingId + 1 : startingId + 1;

            const newBooking = new Booking({
                bookingId: newId,
                roomId: req.body.roomId,
                email: req.body.email,
                start: req.body.start,
                end: req.body.end
            });

            return newBooking.save();
        })
        .then((result) => {
            res.status(201).json({
                message: "Booking created successfully!",
                result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Booking creation failed!",
                error: err.message
            });
        });
}


// ✅ Read All Bookings
export function getAllBookings(req, res) {
    Booking.find()
        .then((bookings) => {
            res.status(200).json(bookings);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Fetching bookings failed!",
                error: err
            });
        });
}

// ✅ Read Single Booking (by bookingId)
export function getBookingById(req, res) {
    const bookingId = req.params.id;
    Booking.findOne({ bookingId })
        .then((booking) => {
            if (!booking) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.status(200).json(booking);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Fetching booking failed!",
                error: err
            });
        });
}

// ✅ Update Booking
export function updateBooking(req, res) {
    const bookingId = req.params.id;

    Booking.findOneAndUpdate(
        { bookingId },
        req.body,
        { new: true } // return updated doc
    )
        .then((updatedBooking) => {
            if (!updatedBooking) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.status(200).json({
                message: "Booking updated successfully!",
                updatedBooking
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Updating booking failed!",
                error: err
            });
        });
}

// ✅ Delete Booking
export function deleteBooking(req, res) {
    const bookingId = req.params.id;

    Booking.findOneAndDelete({ bookingId })
        .then((deletedBooking) => {
            if (!deletedBooking) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.status(200).json({
                message: "Booking deleted successfully!",
                deletedBooking
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Deleting booking failed!",
                error: err
            });
        });
}
