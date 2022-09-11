import db from '../database/db.js';
import dayjs from "dayjs";
import joi from 'joi';

const transactionSchema = joi.object({
    value: joi.number().min(1).positive().required().empty(''),
    description: joi.string().required().empty('')
}); 

function currentDate() {
    return dayjs(new Date()).format('DD/MM');
};

// Para adicionar um novo crédito no My Wallet:
async function addCashIn(req, res) {
    const { value, description } = req.body;
    const validation = transactionSchema.validate(req.body, {abortEarly: false});
    const token = req.headers.authorization?.replace('Bearer ', '');

    if(validation.error) {
        const error = validation.error.details.map(detail => detail.message);

        return res.status(422).send(error);
    };

    if(!token) {
        return res.send(401);
    };

    try {
        const userSession = await db.collection('sessions').findOne({ token });
        if(!userSession) {
            return res.send(401);
        };

        const user = await db.collection('users').findOne({ _id: userSession.userId });
        if(!user) {
            return res.send(401);
        };

        const addCash = await db.collection('userTransactions').insertOne({
            value,
            description,
            date: currentDate(),
            type: "cash_in",
            userId: user._id
        });

        return res.status(201).send(addCash);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Erro ao adicionar seu dinheiro no servidor!");
    };
};

// Para adicionar um novo débito no My Wallet:
async function addCashOut(req, res) {
    const { value, description } = req.body;
    const validation = transactionSchema.validate(req.body, {abortEarly: false});
    const token = req.headers.authorization?.replace('Bearer ', '');

    if(validation.error) {
        const error = validation.error.details.map(detail => detail.message);

        return res.status(422).send(error);
    };

    if(!token) {
        return res.send(401);
    };

    try {
        const userSession = await db.collection('sessions').findOne({ token });
        if(!userSession) {
            return res.send(401);
        };

        const user = await db.collection('users').findOne({ _id: userSession.userId });
        if(!user) {
            return res.send(401);
        };

        const outCash = await db.collection('userTransactions').insertOne({
            value,
            description,
            date: currentDate(),
            type: "cash_out",
            userId: user._id
        });

        return res.status(201).send(outCash);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Erro no servidor ao adicionar saída de dinheiro!");
    };
};

// Para listar todas as transações feitas no My Wallet:
async function getHistoryTransactions(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) {
        return res.send(401);
    };

    try {
        const userSession = await db.collection('sessions').findOne({ token });
        if(!userSession) {
            return res.send(401);
        };

        const user = await db.collection('users').findOne({ _id: userSession.userId });
        if(!user) {
            return res.send(401);
        };

        const transactions = await db.collection('userTransactions').find({ userId: user._id }).toArray();

        return res.status(200).send(transactions);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

export { addCashIn, addCashOut, getHistoryTransactions }; 
