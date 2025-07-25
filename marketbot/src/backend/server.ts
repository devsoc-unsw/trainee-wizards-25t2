import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './api/user';
import listingsRouter from './api/listings';
import conversationsRouter from './api/conversations';

const app = express();
const port = process.env.PORT || 3000; // default port

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Imported Routes
app.use('/api/user', userRouter);
app.use('/api/listings', listingsRouter);
app.use('/api/conversations', conversationsRouter);

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the MarketBot API!');
});

// start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});