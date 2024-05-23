import express from 'express';
import dotenv from 'dotenv';
import Lirium from './models/Lirium.mjs';

import PubNubServer from './pubnubServer.mjs';



const app = express();
app.use(express.json());

app.use('/api/lirium', liriumRouter)