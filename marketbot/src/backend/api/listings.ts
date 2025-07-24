import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; // adjust import
import { ListingInput } from '../interfaces';

const router = Router();
const prisma = new PrismaClient();

// these are cooked rn btw

// Create a new listing
router.post('/', async (req: Request, res: Response) => {
    const data: ListingInput = req.body;

    try {
        const listing = await prisma.listing.create({ data });
        res.status(201).json(listing);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create listing', details: err });
    }
});

// Get all listings
router.get('/', async (_req: Request, res: Response) => {
  const listings = await prisma.listing.findMany();
  res.json(listings);
});

// Get a single listing by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json(listing);
});

// Update a listing
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updated = await prisma.listing.update({
      where: { id },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update listing', details: err });
  }
});

// Delete a listing
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.listing.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete listing', details: err });
  }
});

export default router;