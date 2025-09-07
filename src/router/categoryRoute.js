import {createCategory} from "../controller/categoryController.js"
import express from 'express'

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);

export default categoryRouter