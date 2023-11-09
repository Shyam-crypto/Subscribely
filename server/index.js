import express from 'express';
import dotenv from 'dotenv'
import routes from './routes/routes.js'
import db from './database/connection.js';
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use('/api/auth', routes);

db();

app.listen(PORT, () => {
    console.log(`server is listening on the port ${PORT}`);
});