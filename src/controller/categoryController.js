import Category from "../model/category.js";

//Create category
export function createCategory(req, res){
    if (req.user == null) {
        return res.status(401).json({
            message:"Please login to create category !"
        })
    }
 
    const newCategory = new Category(req.body)
    newCategory.save().then(
        (result)=>{
            res.status(201).json({
                message:"Category created successfully",
                result:result
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message:"Category creation failed",
                error:err
            })
        }
    )
}