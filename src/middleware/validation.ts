import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Receipt } from '../types';

export const validateReceipt: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const receipt = req.body as Receipt;
    
    // Validate required fields
    if (!receipt.retailer || !receipt.purchaseDate || !receipt.purchaseTime || 
        !receipt.items || !receipt.total) {
        res.status(400).json({ error: 'The receipt is invalid.' });
        return;
    }

    // Validate retailer name format
    if (!/^[\w\s\-&]+$/.test(receipt.retailer)) {
        res.status(400).json({ error: 'The receipt is invalid.' });
        return;
    }

    // Validate purchase date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(receipt.purchaseDate)) {
        res.status(400).json({ error: 'The receipt is invalid.' });
        return;
    }

    // Validate purchase time format (HH:MM)
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(receipt.purchaseTime)) {
        res.status(400).json({ error: 'The receipt is invalid.' });
        return;
    }

    // Validate total format
    if (!/^\d+\.\d{2}$/.test(receipt.total)) {
        res.status(400).json({ error: 'The receipt is invalid.' });
        return;
    }

    // Validate items array
    if (!Array.isArray(receipt.items) || receipt.items.length === 0) {
        res.status(400).json({ error: 'The receipt is invalid.' });
        return;
    }

    // Validate each item
    for (const item of receipt.items) {
        if (!item.shortDescription || !item.price) {
            res.status(400).json({ error: 'The receipt is invalid.' });
            return;
        }
        
        if (!/^[\w\s\-]+$/.test(item.shortDescription)) {
            res.status(400).json({ error: 'The receipt is invalid.' });
            return;
        }
        
        if (!/^\d+\.\d{2}$/.test(item.price)) {
            res.status(400).json({ error: 'The receipt is invalid.' });
            return;
        }
    }

    next();
};