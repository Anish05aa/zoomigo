import express from 'express';
import { getAllVehiclesForUsers } from '../controllers/vehicleController.js';



const vehicleRouter = express.Router()

vehicleRouter.get('/list',getAllVehiclesForUsers )

export default vehicleRouter;