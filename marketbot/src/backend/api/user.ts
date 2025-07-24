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

export default router;