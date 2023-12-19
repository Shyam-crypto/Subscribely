import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/auth.js'
import db from './database/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', routes);

 async function startApp(){
        db()
        .then(()=> {
            console.log("DB: running")
            app.listen(PORT, () =>{
                console.log(`server started on port ${PORT}`)
            });
        }).catch(console.log)
    
}
 startApp();
