// Add at the top of adminController.js
import Vehicle from '../models/vehiclemodel.js'; // Make sure path is correct


export const changeAvailability = async (req, res) => {
    try {
        const { vehId } = req.body;

        const vehicleData = await Vehicle.findById(vehId);
        if (!vehicleData) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        await Vehicle.findByIdAndUpdate(vehId, {
            available: !vehicleData.available
        });

        res.json({
            success: true,
            message: "Vehicle availability updated successfully"
        });

    } catch (err) {
        console.error("Change Vehicle Availability Error:", err);
        res.status(500).json({
            success: false,
            message: "Error updating vehicle availability",
            error: err.message
        });
    }
};

// GET /api/vehicles/list
export const getAllVehiclesForUsers = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json({
            success: true,
            vehicles,
        });
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching vehicle list",
            error: error.message,
        });
    }
};

