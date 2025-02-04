// src/routes/receipts.ts
import express, { Request, Response } from 'express';
import { Receipt } from '../types/index';
import { receiptService } from '../services/receiptService';
import { validateReceipt } from '../middleware/validation';

const router = express.Router();


router.post('/process', validateReceipt, (req: Request, res: Response) => {
    try {
        const receipt: Receipt = req.body;
        const id = receiptService.processReceipt(receipt);
        res.json({ id });
    } catch (error) {
        res.status(400).json({ error: 'Please verify input.' });
    }
});

//@ts-ignore
router.get('/:id/points', (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const points = receiptService.getPoints(id);
    
    if (points === null) {
        return res.status(404).json({ error: 'No receipt found for that ID.' });
    }
    
    res.json({ points });
});

export default router;