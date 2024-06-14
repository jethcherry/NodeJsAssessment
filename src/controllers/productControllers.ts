import { Request, Response } from "express";
import { sqlConfig } from "../config";
import mssql from 'mssql';




export const createProduct = async (req: Request, res: Response) => {

  try {
    const { name,price,description } = req.body;
    const pool = await mssql.connect(sqlConfig)
    await pool.request()
    .input('name',  name)
    .input('price', price)
    .input('description', description)
    .execute('createProduct');
    res.status(201).send('Product created successfully');
  } catch (error) {
    res.status(500).send(error);
  }
};


export const searchProduct = async (req: Request, res: Response) => {
  const { description } = req.query;

  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request()
      .input('description', description)
      .execute("searchProduct");

    if (result.recordset.length > 0) {
      return res.status(200).json(result.recordset);
    } else {
      return res.status(404).json({ message: 'Product not found!' });
    }

  } catch (error) {
    res.status(500).send(error);
  }
};

export const paginateList = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const offset = (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);

  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request()
      .input('offset', mssql.Int, offset)
      .input('limit', mssql.Int, parseInt(limit as string, 10))
      .execute('paginateList');

    const products = result.recordset;
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
};
;


export const filterStudents = async (req: Request, res: Response) => {
    const { minPrice, maxPrice, productName } = req.query;
  
    let query = 'EXEC filterStudent @minPrice, @maxPrice, @productName';
    const params = {
      minPrice: parseFloat(minPrice as string),
      maxPrice: parseFloat(maxPrice as string),
      productName: `%${productName}%`
    };
  
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('minPrice', params.minPrice)
        .input('maxPrice',  params.maxPrice)
        .input('productName',  params.productName)
        .query(query);
  
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).send(error);
    }
  };