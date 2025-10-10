import Booking from "../model/booking.js";
import Room from "../model/room.js";
import { isCustomerValid } from "./userController.js";

// ✅ Create Booking (Already done)
export async function createBooking(req, res) {
  try {
    if (!isCustomerValid(req)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { roomId, email, start, end } = req.body;
    const startDate = new Date(start);
    const endDate = new Date(end);

    // ✅ Step 1: Check if room is already booked for this period
    const conflictingBooking = await Booking.findOne({
      roomId,
      $or: [
        { start: { $lte: endDate }, end: { $gte: startDate } } // overlapping range
      ],
    });

    if (conflictingBooking) {
      return res.status(400).json({
        message: "Room already booked for the selected dates!",
        conflictingBooking,
      });
    }

    // ✅ Step 2: Generate new bookingId
    let startingId = 200;
    const lastBooking = await Booking.findOne().sort({ bookingId: -1 });
    const lastId = lastBooking ? Number(lastBooking.bookingId) : startingId;
    const newId = lastId + 1;

    // ✅ Step 3: Create booking
    const newBooking = new Booking({
      bookingId: newId,
      roomId: Number(roomId),
      email,
      start: startDate,
      end: endDate,
    });

    const result = await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully!",
      result,
    });

  } catch (err) {
    res.status(500).json({
      message: "Booking creation failed!",
      error: err.message,
    });
  }
}



// ✅ Read All Bookings
export function getAllBookings(req, res) {
    Booking.find()
        .then((bookings) => {
            res.status(200).json({list : bookings});
        })
        .catch((err) => {
            console.error(err);
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
            // res.json({
            //     mesage: "Booking alrady exist",
            //     result: response
            // })

            const overlappingBooking = response;
            const rooms = [];

            for (let i = 0; i < overlappingBooking.length; i++) {
                rooms.push(overlappingBooking[i].roomId)

            }

            Room.find({
                roomId: { $nin: rooms },
                category: req.body.category
            }).then(
                (result) => {
                    if (rooms.length == 0) {
                        res.json({
                            message: "No room available",
                            result
                        })
                    } else {
                        let startingId = 200;

                        Booking.findOne().sort({ bookingId: -1 })
                            .then((lastBooking) => {

                                const lastId = lastBooking ? Number(lastBooking.bookingId) : startingId;
                                const newId = lastId + 1;
                                const newBooking = new Booking({
                                    bookingId: newId,
                                    roomId: rooms[0].roomId, // ensure number
                                    email: req.body.email,
                                    start: new Date(start),
                                    end: new Date(end)
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

                }
            ).catch(
                (err) => {
                    res.status(500).json({
                        message: "Room get failed !",
                        error: err?.message || err,
                    })
                }
            )

        }
    )

}


//update status
export function updateStatus(req, res) {
  const bookingId = req.params.id;  // from URL like /update-status/201
  const { status } = req.body;      // from frontend

  Booking.findOneAndUpdate(
    { bookingId },                  // find by bookingId
    { status },                     // update only the status
    { new: true }                   // return the updated document
  )
    .then((updatedBooking) => {
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.status(200).json({
        message: "Booking updated successfully!",
        updatedBooking,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Updating booking failed!",
        error: err.message,
      });
    });
}
