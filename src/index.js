import express from 'express';
import cors from 'cors';

import { createUser, loginUser, getUsersList } from './controllers/users.controller.js';
import { addCashIn, addCashOut, getHistoryTransactions } from './controllers/transactions.controller.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rotas do usuário:
app.post("/sign-in", loginUser);
app.post("/sign-up", createUser);
app.get("/users", getUsersList);


// Rotas das transações:
app.post("/cash-in",addCashIn);
app.post("/cash-out", addCashOut);
app.get("/history", getHistoryTransactions);


app.listen(5000);
