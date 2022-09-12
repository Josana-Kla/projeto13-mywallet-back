import express from 'express';
import cors from 'cors';
import userRouter from './routers/user.routers.js';
import transactionRouter from './routers/transaction.routers.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rotas do usuário:
app.use(userRouter);

// Rotas das transações:
app.use(transactionRouter);


app.listen(5000);
