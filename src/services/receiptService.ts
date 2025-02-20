import { v4 as uuidv4 } from 'uuid';
import { Receipt, ProcessedReceipt } from '../types';

class ReceiptService {
    private receipts: Map<string, ProcessedReceipt> = new Map();

    public processReceipt(receipt: Receipt): string {
        const points = this.calculatePoints(receipt);
        const id = uuidv4();
        
        this.receipts.set(id, {
            id,
            points,
        });

        return id;
    }

    public getPoints(id: string): number | null {
        const receipt = this.receipts.get(id);
        return receipt ? receipt.points : null;
    }


    public delReceipt(id:string) {
            const  result = this.receipts.delete(id)
            return id;
    }

    private calculatePoints(receipt: Receipt): number {
        let points = 0;

        // Rule 1: One point for every alphanumeric character in the retailer name
        points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;

        // Rule 2: 50 points if the total is a round dollar amount
        if (receipt.total.endsWith('.00')) {
            points += 50;
        }

        // Rule 3: 25 points if the total is a multiple of 0.25
        const totalCents = Math.round(parseFloat(receipt.total) * 100);
        if (totalCents % 25 === 0) {
            points += 25;
        }

        // Rule 4: 5 points for every two items
        points += Math.floor(receipt.items.length / 2) * 5;

        // Rule 5: Points for items whose description length is a multiple of 3
        points += receipt.items.reduce((acc, item) => {
            const trimmedLength = item.shortDescription.trim().length;
            if (trimmedLength % 3 === 0) {
                acc += Math.ceil(parseFloat(item.price) * 0.2);
            }
            return acc;
        }, 0);

        // Rule 6: 6 points if the day in the purchase date is odd
        const purchaseDay = parseInt(receipt.purchaseDate.split('-')[2], 10);
        if (purchaseDay % 2 === 1) {
            points += 6;
        }

        // Rule 7: 10 points if purchase time is between 2:00pm and 4:00pm
        const [hours, minutes] = receipt.purchaseTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        if (totalMinutes >= 840 && totalMinutes < 960) points += 10;

        return points;
    }
}

export const receiptService = new ReceiptService();