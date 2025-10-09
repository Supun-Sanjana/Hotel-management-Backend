import { createRoom, deleteRoom, getAllRooms, getRoomByCategory, getRoomById, updateRoom } from "../controller/roomController.js"
import express from "express"
import { authenticate } from "../midddleware/auth.js"

const roomRouter = express.Router()

roomRouter.post("/create-room", authenticate, createRoom)
roomRouter.delete("/:roomId",authenticate, deleteRoom)
roomRouter.get("/", getAllRooms)
roomRouter.get("/byCategory/:category", getRoomByCategory)
roomRouter.get("/:roomId", getRoomById)
roomRouter.put("/:roomId",authenticate, updateRoom)


export default roomRouter