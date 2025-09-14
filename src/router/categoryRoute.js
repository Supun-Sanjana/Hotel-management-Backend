import {createCategory, deleteCategory, getAllCategories, getCategoryByName} from "../controller/categoryController.js"
import express from 'express'

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.delete("/:name",deleteCategory );
categoryRouter.get("/",getAllCategories );
categoryRouter.get("/:name",getCategoryByName );

export default categoryRouter