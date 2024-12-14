import { Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();

router.post('/login', async (req, res): Promise<any> => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error('User not found for email:', email);
            return res.status(400).json({ message: 'User not found' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            console.error('Invalid password for user:', email);
            return res.status(400).json({ message: 'Invalid password' });
        }

        return res.status(200).json({ user: { id: user._id, username: user.username, role: user.role } });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/register', async (req, res): Promise<any> => {
    const { username, email, password, role, secretKey } = req.body;

    if (role === 'admin' && secretKey !== process.env.SECRET_KEY) {
        return res.status(400).json({ message: 'Invalid secret key for admin role' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user',
        });

        await user.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/logout', (req, res) : any => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out' });
});

export default router;