import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import courseRoute from './routes/course.route.js';
import enrollmentRoute from './routes/enrollment.route.js';
import materialRoute from './routes/material.route.js';
import permissionRoute from './routes/permission.route.js';
import reviewRoute from './routes/review.route.js';
import roleRoute from './routes/role.route.js';
import scheduleRoute from './routes/schedule.route.js';

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
app.use('/api/auth/', authRoute);
app.use('/api/users/', userRoute);
app.use('/api/courses/', courseRoute);
app.use('/api/enrollments/', enrollmentRoute);
app.use('/api/materials/', materialRoute);
app.use('/api/permissions/', permissionRoute);
app.use('/api/reviews/', reviewRoute);
app.use('/api/roles/', roleRoute);
app.use('/api/schedules/', scheduleRoute);

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