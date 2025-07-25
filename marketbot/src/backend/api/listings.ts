import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; // adjust import
import { ListingInput } from '../interfaces';

const router = Router();
const prisma = new PrismaClient();

// Note prisma is strict with types so you must ensure 
// types in request body match schema

// Create a new listing
router.post('/', async (req: Request, res: Response) => {
    const data: ListingInput = req.body;
    data.status = "active"; // default status for new listings

    console.log(data);
    try {
        const listing = await prisma.listing.create({ data });
        res.status(201).json(listing);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create listing', details: err });
    }
});

// Get all listings for a user (seller)
router.get('/', async (req: Request, res: Response) => {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const listings = await prisma.listing.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        res.json(listings);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch listings', details: err });
    }
});

// Get a single listing by ID for a user (seller)
router.get('/:id', async (req: Request, res: Response) => {
    const { userId } = req.query;
    const { id } = req.params;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const listing = await prisma.listing.findUnique({ 
            where: { id, userId }, 
        });
        if (!listing) return res.status(404).json({ error: 'Listing not found' });
        res.json(listing);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch listing', details: err });
    }
});

// Update a listing given ID for a user (seller)
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const data: ListingInput = req.body;
    console.log(data);
    try {
        const updated = await prisma.listing.update({
        where: { id, userId: data.userId },
        data: data,
        });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update listing', details: err });
    }
});

// Delete a listing given ID for a user (seller)
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'User ID is required' });
    }
    
    try {
        await prisma.listing.delete({ where: { id, userId } });
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete listing', details: err });
    }
});

export default router;