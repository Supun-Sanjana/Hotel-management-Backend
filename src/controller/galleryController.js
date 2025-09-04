import Gallery from "../model/gallery.js";


//create gallery item
export function createGallery(req, res) {
    const galleryItem = req.body;

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