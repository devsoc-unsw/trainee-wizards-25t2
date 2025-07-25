import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; // adjust import
import { UserInput } from '../interfaces';

const router = Router();
const prisma = new PrismaClient();

// Create a new user - first time user
router.post('/', async (req: Request, res: Response) => {
    const data : UserInput = req.body;

    try {
        const user = await prisma.user.create({ data });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create user', details: err });
    }
});

// Get user by Discord ID
router.get('/:discordId', async (req: Request, res: Response) => {
    const { discordId } = req.params;
    if (!discordId || typeof discordId !== 'string') {
        return res.status(400).json({ error: 'Discord ID is required' });
    }
    try {
        const user = await prisma.user.findUnique({ where: { discordId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user', details: err });
    }
});

export default router;