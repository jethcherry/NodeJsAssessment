import Router  from "express";
import { createProduct,searchProduct,paginateList,filterStudents } from "../controllers/productControllers";

const ProductsRouter = Router();

ProductsRouter.post('/products', createProduct);
ProductsRouter.get('/products/search', searchProduct);
ProductsRouter.get('/products/paginate', paginateList);
ProductsRouter.get('/products/filter', filterStudents);

export default ProductsRouter;