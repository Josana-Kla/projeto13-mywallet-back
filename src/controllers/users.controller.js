import db from '../database/db.js';
import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';


const usersSchema = joi.object({
    name: joi.string().alphanum().required().empty(''),
    email: joi.string().email().required().empty(''),
    password: joi.string().alphanum().required().empty(''),
    checkPassword: joi.string().alphanum().required().empty('')
}); 

// Check if user already exists
async function checkUserExists(email) {
    try {
        const userExists = await db.collection('users').findOne({email});

        if(userExists === null) {
            console.log("Opa! Você é novo por aqui? Se apresente! 😃");
            return false;
        } else {
            console.log("Esse usuário já existe no banco: \n", {name: userExists.name, email: userExists.email});
            return true;
        };
    } catch (error) {
        console.log(error);
        console.log("Deu erro no servidor!");
    }
};

// Rota de SignUp/Cadastro do usuário
async function createUser(req, res) {
    const { name, email, password, checkPassword } = req.body;
    const validation = usersSchema.validate(req.body, {abortEarly: false});

    if(validation.error) {
        const error = validation.error.details.map(detail => detail.message);

        return res.status(422).send(error);
    };

    if(await checkUserExists(email)) {
        return res.sendStatus(409);
    };

    if(password !== checkPassword) {
        return res.status(422).send("As senhas não conferem!");
    };

    const hashPassword = bcrypt.hashSync(password, 10);

    try {
        await db.collection('users').insertOne({ 
            name, 
            email, 
            password: hashPassword, 
            lastStatus: Date.now() 
        });
        return res.sendStatus(201);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

// Rota para o Login/SignIn do usuário
async function loginUser(req,res) {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.sendStatus(400);
    };

   
    try {
        const user = await db.collection('users').findOne({email});
        console.log(user);
        const isValid = bcrypt.compareSync(password, user.password);

        if(!isValid) {
            return res.sendStatus(401);
        };

        const token = uuidv4();
        db.collection('sessions').insertOne({
            token,
            userId: user._id
        });

        return res.status(200).send({token: token});

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

// Rota para listar os usuários
async function getUsersList(req, res) {
    try {
        const users = await db.collection('users').find().toArray();

        return res.status(200).send(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

export { createUser, loginUser, getUsersList }; 