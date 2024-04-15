import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import userRoute from './routes/user.route.js';

//initialisation
config();
const uri = process.env.DB_URI;
const port = process.env.PORT || 3000;
const swaggerJson = JSON.parse(fs.readFileSync('./swagger.json'));
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use('/api/users/', userRoute);

//hello
app.get('/', (req,res) => {
    res.send("Hello from Node API");
});

//db connection
mongoose.connect(uri)
.then(() => {
    console.log('Connected to database');
    app.listen(port, ()=>{
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log('Connection failed');
});