import express from 'express';
import { createUser, loginUser, getUsersList } from '../controllers/users.controller.js';

const router = express.Router();

router.post("/sign-in", loginUser);
router.post("/sign-up", createUser);
router.get("/users", getUsersList);

export default router;