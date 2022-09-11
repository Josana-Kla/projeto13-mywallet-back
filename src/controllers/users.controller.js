import db from '../database/db.js';
import joi from 'joi';
import bcrypt from 'bcrypt';

const usersSchema = joi.object({
    name: joi.string().alphanum().required().empty(''),
    email: joi.string().email().required().empty(''),
    password: joi.string().alphanum().required().empty(''),
    checkPassword: joi.string().alphanum().required().empty('')
}); 

// Rota de SignUp/Cadastro do usuário
async function createUser(req, res) {
    const { name, email, password, checkPassword } = req.body;
    const validation = usersSchema.validate(req.body);

    if(validation.error) {
        const error = validation.error.details.map(detail => detail.message);

        res.status(422).send(error);
        return;
    };

}

async function usersList(req, res) {
    try {
        const users = await db.collection('users').find().toArray();

        return res.status(200).send(users);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

export { createUser, usersList }; 