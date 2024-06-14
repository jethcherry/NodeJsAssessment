import express, { json } from 'express';
import ProductsRouter from './src/routes/productRoutes';
const app = express();

// Middleware
app.use(json());

// Routes
app.use("/product", ProductsRouter);


app.listen(5500, () => console.log('Server is Running on port 5500'));
