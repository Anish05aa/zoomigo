// middleware/authOwner.js
import jwt from 'jsonwebtoken';
import Owner from '../models/ownermodel.js';

const authOwner = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Find owner in database
    const owner = await Owner.findOne({ 
      _id: decoded.id,
      email: decoded.email 
    });

    if (!owner) {
      return res.status(401).json({
        success: false,
        message: 'Owner not found'
      });
    }

    // 4. Attach owner to request
    req.owner = {
      id: owner._id,
      email: owner.email,
      name: owner.name
    };

    next();
  } catch (err) {
    console.error('Owner auth error:', err);
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

export default authOwner;