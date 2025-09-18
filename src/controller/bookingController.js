import Booking from "../model/booking.js";
import { isCustomerValid } from "./userController.js";

//create booking
export function createBooking(req, res) {

    if (!isCustomerValid(req)) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    let startingId = 200;
    Booking.countDocuments({}).then(
        (count) => {
            const newId = startingId + count + 1;
            const newBooking = new Booking({
                bookingId: newId,
                roomId: req.body.roomId,
                email: req.body.email,
                start: req.body.start,
                end: req.body.end
            })

            newBooking.save().then(
                (result) => {
                    res.status(201).json({
                        message: "Booking created success !",
                        result
                    })
                }
            ).catch(
                (err) => {
                    res.status(500).json({
                        message: "Booking creation failed !",
                        error: err
                    })
                }
            )
        }
    )
}