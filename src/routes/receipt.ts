import express, { Request, Response, Router } from 'express';
import { Receipt } from '../types/index';
import { receiptService } from '../services/receiptService';
import { validateReceipt } from '../middleware/validation';

const router :Router = express.Router();


router.post('/process', validateReceipt, (req: Request<{}, any, Receipt>, res: Response) => {
    try {
        const receipt: Receipt = req.body;
        const id = receiptService.processReceipt(receipt);
        res.json({ id });
    } catch (error) {
        res.status(400).json({ error: 'The receipt is invalid.'});
    }
});


router.get('/:id/points', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params ;
    const points = receiptService.getPoints(id);
    
    if (points === null) {
        res.status(404).json({ error: 'No receipt found for that ID.' });
        return
    }
    
    res.json({ points });
});

router.delete('/:id/del', (req:Request<{id:string}>, res:Response)=>{

    try{
    const {id} = req.params
    
    const result = receiptService.delReceipt(id);
        
        if (result) {
            res.status(200).json({ message:`the deleted receipt ID:${id}` });
        } else {
            res.status(404).json({ error: 'Receipt not found' });
        }
    }catch(error){
        res.status(500)
    }

})


export default router;


//:id 
