import {createCategory, deleteCategory, getAllCategories, getCategoryByName, updateCategory} from "../controller/categoryController.js"
import express from 'express'

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.delete("/:name",deleteCategory );
categoryRouter.get("/",getAllCategories );
categoryRouter.get("/:name",getCategoryByName );
categoryRouter.put("/:name", updateCategory)

export default categoryRouter