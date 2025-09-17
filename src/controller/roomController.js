import Room from "../model/room.js";
import { isAdminValid } from "./userController.js";

//create room
export function createRoom(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    const newRoom = new Room(req.body).save().then(
        (result) => {
            return res.json({
                message: "Room created success",
                result
            })
        }
    ).catch(
        (err) => {
            return res.status(500).json({
                message: "Room creation failed !",
                error: err?.message || err,
            })
        }
    )
}

//delete room
export function deleteRoom(req, res){
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    const roomId  = req.params.roomId
    Room.findOneAndDelete({roomId}).then(
        ()=>{
            return res.json({
                message:"Room deleted success"
            })
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message: "Room deletion failed !",
                error: err?.message || err,
            })
        }
    )
}

//find room by id
export function getRoomById(req, res){
    const roomId = req.params.roomId
    Room.findOne({roomId}).then(
        (room)=>{
            if (!room) {
                return res.status(404).json({
                    message: "Room not found"
                })
            }else{
                return res.json({
                    room
                })
            }
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message: "Room get failed !",
                error: err?.message || err,
            })
        }
    )
}

//get all rooms
export function getAllRooms(req, res){
    Room.find().then(
        (rooms)=>{
            return res.json({
                rooms
            })
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message: "Room get failed !",
                error: err?.message || err,
            })
        }
    )
}

//update room
export function updateRoom(req, res){
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    const roomId = req.params.roomId
    Room.findOneAndUpdate({roomId}, req.body).then(
        (result)=>{
            return res.json({
                message:"Room updated success",
                result
            })
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message: "Room update failed !",
                error: err?.message || err,
            })
        }
    )
}