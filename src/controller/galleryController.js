// controllers/galleryController.js
import Gallery from "../model/gallery.js";

// Create gallery item
export function createGallery(req, res) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Please login to create gallery item" });
  }

  const galleryItem = req.body.item;

  const newGalleryItem = new Gallery(galleryItem);

  newGalleryItem.save()
    .then(() => {
      res.json({ message: "Gallery item created successfully" });
    })
    .catch(() => {
      res.status(500).json({ message: "Gallery item creation failed" });
    });
}

// Get all gallery items
export function getGallery(req, res) {
  Gallery.find()
    .then((list) => {
      res.json({ list });
    })
    .catch(() => {
      res.status(500).json({ message: "Failed to fetch gallery items" });
    });
}

// Update gallery item
export function updateGallery(req, res) {
  const { id } = req.params;
  Gallery.findByIdAndUpdate(id, req.body, { new: true })
    .then((item) => {
      res.json({ message: "Gallery item updated successfully", item });
    })
    .catch(() => {
      res.status(500).json({ message: "Failed to update gallery item" });
    });
}

// Delete gallery item
export function deleteGallery(req, res) {
  const { id } = req.params;
  Gallery.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "Gallery item deleted successfully" });
    })
    .catch(() => {
      res.status(500).json({ message: "Failed to delete gallery item" });
    });
}
