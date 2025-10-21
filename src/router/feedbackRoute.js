import express from 'express'
import { createFeedback, getAllFeedback } from '../controller/feedbackController.js';

const feedbackRoute = express.Router();

feedbackRoute.post('/', createFeedback);
feedbackRoute.get('/', getAllFeedback);

export default feedbackRoute
