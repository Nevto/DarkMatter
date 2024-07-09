import express from 'express';
import dotenv from 'dotenv';
import DarkMatter from './models/DarkMatter.mjs';
import TransactionPool from './models/TransactionPool.mjs';
import Wallet from './models/Wallet.mjs';
import darkMatterRouter from './routes/darkmatter-routes.mjs';
import PubNubServer from './pubnubServer.mjs';
import blockRouter from './routes/block-routes.mjs';
import transactionRouter from './routes/transaction-routes.mjs';
import authRouter from './routes/auth-routes.mjs';
import errorHandler from './middleware/errorhandler.mjs';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan'
import { fileURLToPath } from 'url';
import { connectDb } from './config/mongo.mjs';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';


dotenv.config({ path: './config/config.env' });

connectDb()

const credentials = {
    publishKey: process.env.PUBLISH_KEY,
    subscribeKey: process.env.SUBSCRIBE_KEY,
    secretKey: process.env.SECRET_KEY,
    userId: process.env.USER_ID
};

export const darkMatter = new DarkMatter();
export const transactionPool = new TransactionPool();
export const wallet = new Wallet();
export const pubnubServer = new PubNubServer({
    darkMatter,
    transactionPool,
    wallet,
    credentials,
});

const app = express();

//Security stuff
/// NO-Sql Injection
app.use(mongoSanitize())
//headers
app.use(helmet({ contentSecurityPolicy: false }))
app.use(xss())

const limit = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 100,
})
app.use(limit)
//HPP attacker
app.use(hpp())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use(express.json());
app.use(morgan('dev'))

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

global.__appdir = dirname

app.use('/api/v1/darkMatter', darkMatterRouter)
app.use('/api/v1/block', blockRouter)
app.use('/api/v1/transaction', transactionRouter);
app.use('/api/v1/auth', authRouter)

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

const synchronizeChains = async () => {
    const response = await fetch(`${ROOT_NODE}/api/v1/darkMatter`);
    if (response.ok) {
        const result = await response.json();
        darkMatter.replaceChain(result.data);
    }
};

if (process.env.GENERATE_NODE_PORT === 'true') {
    NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Root node is ${ROOT_NODE}`);

    if (PORT !== DEFAULT_PORT) {
        synchronizeChains();
    }

});