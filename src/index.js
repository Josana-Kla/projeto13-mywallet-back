import express from 'express';
import cors from 'cors';
import joi from 'joi';

const app = express();
app.use(cors());
app.use(express.json());


app.listen(5000);
