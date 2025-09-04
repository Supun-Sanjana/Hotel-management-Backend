import express from 'express'
import {createGallery, getGallery} from '../controller/galleryController.js'

const galleryRouter = express.Router();

galleryRouter.post("/", createGallery)
galleryRouter.get("/", getGallery)


export default galleryRouter