import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import User from './models/user.model.js';

import { executeUsersCrudOperations } from './users.js';

config();
const uri = process.env.DB_URI;
const port = process.env.PORT || 3000;
const swaggerJson = JSON.parse(fs.readFileSync('./swagger.json'));
const app = express();

app.use(express.json());

app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.get('/', (req,res) => {
    res.send("Hello from Node API");
});

app.get('/api/users', async (req,res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/user/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/users', async (req,res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put('/api/user/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

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

// await executeUsersCrudOperations();