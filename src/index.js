import express from 'express';
import cors from 'cors';

import { createUser, loginUser, getUsersList } from './controllers/users.controller.js';
import { addCashIn } from './controllers/transactions.controller.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rotas do usuário:
// Rota de SignIn/Entrada do usuário
app.post("/sign-in", loginUser);
// Rota de SignUp/Cadastro do usuário
app.post("/sign-up", createUser);
app.get("/users", getUsersList);


// Rotas das transações:
// Para adicionar um novo crédito no My Wallet:
app.post("/cash-in",addCashIn);

// Para adicionar um novo débito no My Wallet:
app.post("/cash-out", (req,res) => {

});

// Para listar todas as transações feitas no My Wallet:
app.get("/history", (req,res) => {

});


app.listen(5000);
