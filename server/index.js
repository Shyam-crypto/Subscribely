import express from 'express';
import dotenv from 'dotenv'
import routes from './routes/auth.js'
import db from './database/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/auth', routes);

 async function startApp(){
    try{
        await db();


        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        });
        console.log('Application started succesfully');

    }catch(error){
        console.log('Error during startup:',error.message);
    }
 }

 startApp();
