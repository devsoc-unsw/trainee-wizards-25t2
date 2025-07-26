import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UnauthorizedError } from './utils/errors';

const router = Router();
const prisma = new PrismaClient();

// create new conversation
router.post('/', async (req: Request, res: Response) => {
    // buyerId is facebook ID & default currPrice is maxPrice of listing
    const { listingId, buyerName, buyerId, currPrice } = req.body;
    if (!listingId || !buyerName || !buyerId || !currPrice) {
        return res.status(400).json({ error: 'Listing ID, buyer name, buyer ID and currPrice are required' });
    }
    try {
        const conversation = await prisma.conversation.create({
            data: {
                listingId,
                buyerName,
                buyerId,
                currPrice
            },
        });
        res.status(201).json(conversation);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create conversation', details: err });
    }
});

// get a single conversation by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const conversation = await prisma.conversation.findUnique({
            where: { id }
        });
        
        res.status(200).json(conversation);
    } catch (err) {
        if (err instanceof UnauthorizedError) {
            return res.status(403).json({ error: err.message });
        }

        res.status(500).json({ error: 'Failed to fetch conversation', details: err });
    }
});

// get single conversation by buyer ID
router.get('/by-buyer/:buyerId', async (req: Request, res: Response) => {
    const { buyerId } = req.params;
    if (!buyerId) {
        return res.status(400).json({ error: 'Buyer ID is required' });
    }
    try {
        const conversation = await prisma.conversation.findUnique({
            where: { buyerId }
        });
        
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch conversation', details: err });
    }
});

// update conversation (e.g. mark as closed)
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isClosed, currPrice } = req.body;
    
    if (!id) {
        return res.status(400).json({ error: 'Conversation ID is required' });
    }
    
    try {
        const updated = await prisma.conversation.update({
            where: { id },
            data: { isClosed, currPrice },
        });
        res.status(200).json(updated);
    } catch (err) {
        if (err instanceof UnauthorizedError) {
            return res.status(403).json({ error: err.message });
        }
        
        res.status(500).json({ error: 'Failed to update conversation', details: err });
    }
});

// delete conversation
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Conversation ID is required' });
    }
    try {
        await prisma.conversation.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete conversation', details: err });
    }
});

// show conversation's messages
router.get('/:id/messages', async (req: Request, res: Response) => {
    const { id } = req.params;
    if ( !id) {
        return res.status(400).json({ error: 'Conversation ID is required' });
    }
    try {
        const messages = await prisma.message.findMany({
            where: { conversationId: id },
            orderBy: { timestamp: 'asc' },
        });
        res.status(200).json(messages);
    } catch (err) {
        if (err instanceof UnauthorizedError) {
            return res.status(403).json({ error: err.message });
        }
        
        res.status(500).json({ error: 'Failed to fetch messages', details: err });
    }
});

// add message to conversation
router.post('/:id/messages', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content, sender } = req.body; // sender is if it's buyer or seller bot

    if (!id || !content || !sender) {
        return res.status(400).json({ error: 'Conversation ID, content and sender role is required' });
    }

    try {
        const message = await prisma.message.create({
            data: {
                conversationId: id,
                content,
                sender,
            },
        });
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add message', details: err });
    }
});

/*
async function verifyConversationOwnership(userId: string, id: string) {
    const conversation = await prisma.conversation.findUnique({
        where: { id },
        include: { listing: true },
    });

    if (!conversation || conversation.listing.userId !== userId) {
        throw new UnauthorizedError('Unauthorized or conversation not found');
    }

    return conversation;
}
*/

export default router;