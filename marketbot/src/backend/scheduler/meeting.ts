import { Router, Request, Response } from 'express';
import { PrismaClient} from '@prisma/client';
import { meetingInput } from '../interfaces';

const router = Router();
const prisma = new PrismaClient();

// Create a new meeting 
router.post('/', async (req: Request, res: Response) => {
    const data : meetingInput = req.body; 

    try {
        const user = await prisma.user.create({ data });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create meeting', details: err });
    }
});
