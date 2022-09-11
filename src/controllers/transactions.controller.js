import db from '../database/db.js';
import dayjs from "dayjs";
import joi from 'joi';

const transactionSchema = joi.object({
    /* name: joi.string().alphanum().required().empty(''), */
    value: joi.number().min(1).positive().required().empty(''),
    description: joi.string().required().empty('')
}); 

function currentDate() {
    return dayjs(new Date()).format('DD/MM');
};

async function addCashIn(req, res) {
    const { value, description } = req.body;
    /* const { token } = req.headers; */

    const validation = transactionSchema.validate(req.body, {abortEarly: false});

    if(validation.error) {
        const error = validation.error.details.map(detail => detail.message);

        res.status(422).send(error);
        return;
    };

    try {
        await db.collection('userTransactions').insertOne({
            value,
            description,
            time: currentDate()
        });

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Erro ao adicionar seu dinheiro no servidor!");
    };
};



export { addCashIn }; 
