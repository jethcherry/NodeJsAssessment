CREATE PROCEDURE searchProduct
  @productName VARCHAR(255)
AS
BEGIN
  SELECT * FROM Products
  WHERE name LIKE '%' + @productName + '%';
END;
