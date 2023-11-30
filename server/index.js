import express from 'express';
import dotenv from 'dotenv'
import auth from './routes/auth.js'
import product from './routes/product.js'
import db from './database/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/products', product);

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
