import express from 'express';
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import cors from 'cors';
import joi from 'joi';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.listen(5000);
