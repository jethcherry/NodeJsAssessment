CREATE PROCEDURE createProduct
  @name VARCHAR(255),
  @price DECIMAL(10, 2),
  @description VARCHAR(MAX)
AS
BEGIN
  INSERT INTO Product (name, price, description)
  VALUES (@name, @price, @description);
END;
