import express from 'express';
import dotenv from 'dotenv';
import Lirium from './models/Lirium.mjs';
import PubNubServer from './pubnubServer.mjs';
import liriumRouter from './routes/lirium-routes.mjs';
import blockRouter from './routes/block-routes.mjs';
import transactionRouter from './routes/transaction-routes.mjs';
import errorHandler from './middleware/errorhandler.mjs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';


dotenv.config({ path: './config/config.env' });

const credentials = {
    publishKey: process.env.PUBLISH_KEY,
    subscribeKey: process.env.SUBSCRIBE_KEY,
    secretKey: process.env.SECRET_KEY,
    userId: process.env.USER_ID
};

export const lirium = new Lirium();
export const pubnubServer = new PubNubServer({ lirium, credentials });


const app = express();

app.use(cors())
app.use(express.json());

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

global.__appdir = dirname

app.use('/api/v1/lirium', liriumRouter)
app.use('/api/v1/block', blockRouter)
app.use('/api/v1/transaction', transactionRouter);

app.all('*', (req, res, next) => {
    const error = new Error(`You probably used the wrong URL, doublecheck please - ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

app.use(errorHandler)


const DEFAULT_PORT = 5001;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;

let NODE_PORT;

setTimeout(() => {
    pubnubServer.broadcast();
}, 1000);

if (process.env.GENERATE_NODE_PORT === 'true') {
    NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Root node is ${ROOT_NODE}`);

})