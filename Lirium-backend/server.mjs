import express from 'express';
import dotenv from 'dotenv';
import Lirium from './models/Lirium.mjs';
import PubNubServer from './pubnubServer.mjs';
import liriumRouter from './routes/lirium-routes.mjs';
import errorHandler from './middleware/errorhandler.mjs';


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
app.use(express.json());

app.use('/api/v1/lirium', liriumRouter)


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