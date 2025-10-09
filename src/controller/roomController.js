import Room from "../model/room.js";
import { isAdminValid } from "./userController.js";


export async function createRoom(req, res) {
  // 1️⃣ Check admin permission
  if (!isAdminValid(req)) {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  const { category, maxGuests, available, price, image, description, notes } = req.body;

  if (!category || !price) {
    return res.status(400).json({ message: "Category and price are required." });
  }

  const roomId = "RM" + Date.now();

  try {
    const newRoom = new Room({
      roomId,
      category,
      maxGuests: maxGuests || 3,
      available: available !== undefined ? available : true,
      price,
      image: Array.isArray(image) ? image : [image],
      description: description || "No description",
      notes: notes || "",
    });

    const result = await newRoom.save();

    return res.status(201).json({
      message: "Room created successfully!",
      result,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Room creation failed!",
      error: err?.message || err,
    });
  }
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
                list : rooms
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

//get room by category
export function getRoomByCategory(req, res){
    const category = req.params.category
    Room.find({category}).then(
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