import Booking from "../model/booking.js";
import { isCustomerValid } from "./userController.js";

// ✅ Create Booking (Already done)
export function createBooking(req, res) {
    if (!isCustomerValid(req)) {
        return res.status(403).json({ message: "Forbidden" });
    }

    let startingId = 200;

    console.log(startingId);

    const STARTING_ID = 200;
    console.log('file loaded — createBooking version');            // confirm the file you edited is the one running
    console.log('initial STARTING_ID:', STARTING_ID, typeof STARTING_ID);


    Booking.findOne().sort({ bookingId: -1 })
        .then((lastBooking) => {

            console.log('lastBooking raw:', lastBooking);
            console.log('lastBooking.bookingId raw:', lastBooking?.bookingId, typeof lastBooking?.bookingId);



            const lastId = lastBooking ? Number(lastBooking.bookingId) : startingId;
            const newId = lastId + 1;


            console.log('computed lastId:', lastId, typeof lastId);
            console.log('computed newId:', newId, Number.isFinite(newId));



            const newBooking = new Booking({
                bookingId: newId,
                roomId: Number(req.body.roomId), // ensure number
                email: req.body.email,
                start: new Date(req.body.start),
                end: new Date(req.body.end)
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


//filter date
export function getBookingByDate(req, res) {
    const start = req.body.start;
    const end = req.body.end;

    console.log("start:", start);
    console.log("end:", end);

    Booking.find({
        start: {
            $gte: new Date(start)    // grater than == gt | gte === grater than or equal
        },
        end: {
            $lt: new Date(end)      //less than == lt
        }
    }).then(
        (result) => {
            res.status(200).json(result);
        }
    ).catch(
        (err) => {
            res.status(500).json({
                message: "Fetching booking failed!",
                error: err
            });
        }
    )


}

//create booking by category
export function createBookingByCategory(req, res) {
    const start = new Date(req.body.start);
    const end = new Date(req.body.end);

    Booking.find({
        $or: [{
            start: {
                $gte: start,
                $lt: end

            }
        },
        {
            end: {
                $gt: start,
                $lte: end
            }
        }
        ]
    }).then(
        (response) => {
            res.json({
                mesage: "Booking alrady exist",
                result: response
            })

        }
    )

}
