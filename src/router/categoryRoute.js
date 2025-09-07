import {createCategory, deleteCategory, getAllCategories} from "../controller/categoryController.js"
import express from 'express'

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.delete("/:name",deleteCategory );
categoryRouter.get("/",getAllCategories );

export default categoryRouter