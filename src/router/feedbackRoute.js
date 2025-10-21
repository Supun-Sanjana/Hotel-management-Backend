import express from 'express'
import { createFeedback, deleteById, getAllFeedback, getFeedbackByEmail } from '../controller/feedbackController.js';

const feedbackRoute = express.Router();

feedbackRoute.post('/', createFeedback);
feedbackRoute.get('/', getAllFeedback);
feedbackRoute.get('/byEmail/:email', getFeedbackByEmail)
feedbackRoute.delete('/delete/:id', deleteById)

export default feedbackRoute
