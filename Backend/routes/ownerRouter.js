import express from 'express';
import { getOwnerDashboard, googleOwnerLoginController } from '../controllers/ownerController.js';
import authOwner from '../middleware/authOwner.js';

const ownerRouter = express.Router();

// Google OAuth route
ownerRouter.post('/google-login', googleOwnerLoginController);
// In your auth routes
ownerRouter.get('/auth/google/callback', async (req, res) => {
    try {
        const { code } = req.query;
        const { tokens } = await oauth2Client.getToken(code);

        // Verify the ID token
        const ticket = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        // ... handle user creation/login

        res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${yourJWT}`);
    } catch (error) {
        console.error(error);
        res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
});

ownerRouter.get('/dashboard', authOwner, getOwnerDashboard);




export default ownerRouter;
