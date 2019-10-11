import express from 'express';
import dotenv from 'dotenv';
import route from './routes/mainRoute';
import config from './config/default';


dotenv.config();
const app = express();
app.use('/', route);

const { port } = config;
app.listen(port, () => console.log(`Listening on port ${port}...`));
export default app;
