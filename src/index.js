import express from 'express';
import cors from 'cors';

import { createUser, usersList } from './controllers/users.controller.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rotas do usuário:
// Rota de SignIn/Entrada do usuário
app.post("/sign-in", (req,res) => {

});

// Rota de SignUp/Cadastro do usuário
app.post("/sign-up", createUser);

// Rotas das transações:
// Para adicionar um novo crédito no My Wallet:
app.post("/cash-in", (req,res) => {

});

// Para adicionar um novo débito no My Wallet:
app.post("/cash-out", (req,res) => {

});

// Para listar todas as transações feitas no My Wallet:
app.get("/history", (req,res) => {

});

app.get("/users", usersList);

app.listen(5000);
