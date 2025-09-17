import { createRoom, deleteRoom, getAllRooms, getRoomByCategory, getRoomById, updateRoom } from "../controller/roomController.js"
import express from "express"

const roomRouter = express.Router()

roomRouter.post("/", createRoom)
roomRouter.delete("/:roomId", deleteRoom)
roomRouter.get("/", getAllRooms)
roomRouter.get("/byCategory/:category", getRoomByCategory)
roomRouter.get("/:roomId", getRoomById)
roomRouter.put("/:roomId", updateRoom)


export default roomRouter