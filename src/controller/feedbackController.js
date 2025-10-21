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

//get feedback by email
export async function getFeedbackByEmail(req, res) {
    try {
        const {email} = req.params
    if (!email) {
       return res.status(400).json({message:"email is required"})
    }

    const list =await FeedBack.find({email})
    res.status(200).json({list})

    } catch (error) {
        res.status(500).json({message:"failed to fetch feedbacks" + error.message})
        console.log(error);
        
    }
}

//delete by id
export async function deleteById(req, res) {
  try {
    const {id} = req.params
  if (!id) {
    return res.status(400).json({message:"id is required"})
  }

  await FeedBack.findByIdAndDelete(id)
  res.status(200).json({message:"deleted"})

  } catch (error) {
    res.status(500).json({mesage:"failed to delet feedback" + error.message})
  }
}