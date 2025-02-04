// src/app.ts
import express from 'express';
import receiptsRouter from './routes/receipt';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/receipts', receiptsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;