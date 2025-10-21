import FeedBack from "../model/feedback.js";

//create feedback
export async function createFeedback(req, res) {
  try {
    const { name, email, rating, message } = req.body;

    if (!email || !rating) {
      res.status(400).json({
        message: "Email is required",
      });
    }

    const feedback = req.body;

    const newFeedback = new FeedBack(feedback);
    newFeedback.save();
    await res.status(201).json({ mesage: "feedback created" });
  } catch (error) {
    res.status(500).json({ message: "Feedback created failed" });
  }
}


//get all feedback
export async function getAllFeedback(req, res) {
    try {
        const list =await FeedBack.find();
         res.status(200).json({list})
    } catch (error) {
        res.status(500).json({message:"Faild to fetch feedback"})
    }
}

