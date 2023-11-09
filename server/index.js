import express from 'express';
import dotenv from 'dotenv'
import routes from './routes/authroutes.js'
import db from './database/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
db();

app.use(express.json());
app.use('/api/auth', routes);


app.listen(PORT, () => {
    console.log(`server is listening on the port ${PORT}`);
});