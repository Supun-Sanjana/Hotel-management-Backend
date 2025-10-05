import express from 'express'
import {createGallery, deleteGallery, getGallery, updateGallery} from '../controller/galleryController.js'

const galleryRouter = express.Router();

galleryRouter.post("/", createGallery)
galleryRouter.get("/", getGallery)
galleryRouter.delete("/:id", deleteGallery)
galleryRouter.put("/:id", updateGallery)

export default galleryRouter