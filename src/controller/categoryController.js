import Category from "../model/category.js";
import { isAdminValid } from "./userController.js";

//Create category
export function createCategory(req, res) {
    if (req.body.user == null) {
        return res.status(401).json({
            message: "Please login to create category !"
        })
    }

    const newCategory = new Category(req.body)
    newCategory.save().then(
        (result) => {
            res.status(201).json({
                message: "Category created successfully",
                result: result
            })
        }
    ).catch(
        (err) => {
            res.json({
                message: "Category creation failed",
                error: err
            })
        }
    )
}

//delete category
export function deleteCategory(req, res) {
    // if (!req.body.user) {
    //     return res.status(401).json({
    //         message: "Please login to delete category !"
    //     });
    // }

    // if (req.body.user.type !== "admin") {
    //     return res.status(403).json({
    //         message: "You are not authorized to delete category !"
    //     });
    // }

    const name = req.params.name;

    Category.findOneAndDelete({ name })
        .then((deletedCategory) => {
            if (!deletedCategory) {
                return res.status(404).json({
                    message: "Category not found"
                });
            }
            res.status(200).json({
                message: "Category deleted successfully",
                deletedCategory
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Category deletion failed",
                error: err.message
            });
        });
}

//get all categories
export function getAllCategories(_, res) {
    Category.find().then(
        (list) => {
            res.json({
                categories: list
            })
        }
    ).catch(
        (err) => {
            res.json({
                message: "Category get failed",
                error: err
            })
        }
    )
}

//get category by name
export function getCategoryByName(req, res) {
    const name = req.params.name;

    Category.findOne({ name }).then(
        (category) => {
            if (!category) {
                return res.status(404).json({
                    message: "Category not found"
                });
            }
            res.json({
                category: category
            })
        }
    ).catch(
        (err) => {
            res.json({
                message: "Category get failed",
                error: err
            })
        }
    )
}

export function updateCategory(req, res) {

    if (!isAdminValid(req)) {
       return res.status(403).json({
            message: "Unauthorized !"
        })
    }

    const name = req.params.name
    Category.updateOne({name}, req.body).then(
        ()=>{
            res.json({
                message:"Category created success"
            })
        }
    ).catch((err)=>{
        return res.status(500).json({
            message: "Category creation failed !",
            error:err.message
        })
    })
}

