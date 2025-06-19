import express, { Application } from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import cors from 'cors';

// creates app 
const app: Application = express();
app.use(cors({
    origin: 'http://localhost:3000', // your frontend origin
}));

app.use(express.json());
app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
    console.log('Database and tables Created');
});

export default app;


