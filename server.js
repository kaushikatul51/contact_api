import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'express';
import contactRouter from './routes/contact.js'
import { config } from 'dotenv';

import router from './routes/user.js';

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
config({path:'.env'})
//home routes
app.get('/', (req, res) => {
    res.json({
        message: 'home routes'
    })
})
app.use('/api/user',router)
app.use('/api/contact',contactRouter)

mongoose.connect(process.env.MONGO_URI, {
    dbName: "nodejs"
}).then(() => {
    console.log("mongodb connect successfully")
}).catch((err) => {
    console.log(err)
})
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})