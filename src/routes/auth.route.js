import express from 'express';
import { login, logOut, signUp } from '../controller/user.controller.js';
const route = express.Router();

route.post('/signup', signUp);
route.post('/login', login);
route.post('/logout', logOut);


export default route;