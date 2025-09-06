import Gallery from "../model/gallery.js";


//create gallery item
export function createGallery(req, res) {
    const user = req.body.user

    if (!user) {
        return res.status(401).json({ message: "Please login to create gallery item" });
    }
    // if (user.type !== "admin") {
    //     return res.status(403).json({ message: "You are not authorized to create gallery item" });
    // }  

    const galleryItem = req.body.item;

    const newGalleryItem = new Gallery(galleryItem);

    newGalleryItem.save().then(()=>{
        res.json({
            message:"Gallery item created success"
        })
    }).catch(
        ()=>{
            res.status(500).json({
                message:"Gallery item created failed"
            })
        }
    )
}

//get gallery item
export function getGallery(req, res){
    Gallery.find().then(
        (list)=>{
            res.json({
                list:list
            })
        }
    )
}