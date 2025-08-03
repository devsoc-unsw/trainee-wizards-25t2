import { Router, Request, Response } from 'express';
import { PrismaClient} from '@prisma/client';
import { MeetingInput } from '../interfaces';

const router = Router();
const prisma = new PrismaClient();

// Create a new meeting 
router.post('/', async (req: Request, res: Response) => {
    const data: MeetingInput = req.body; 
    
    console.log(data);
    try {
        const meeting = await prisma.meeting.create({ data });
        res.status(201).json(meeting);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create meeting', details: err});
    }
});

export default router; 