import { Router, Request, Response } from 'express';
import { PrismaClient} from '@prisma/client';
import { ListingInput } from '../interfaces';

const router = Router();
const prisma = new PrismaClient();

