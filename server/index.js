import express from 'express';
import dotenv from 'dotenv'
import routes from './routes/auth.js'
import db from './database/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
db();

app.use(express.json());
app.use('/api/auth', routes);

try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.error("connection failed");
    }