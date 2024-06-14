CREATE PROCEDURE filterStudent
  @minPrice DECIMAL(10, 2),
  @maxPrice DECIMAL(10, 2),
  @productName VARCHAR(255)
AS
BEGIN
  SELECT DISTINCT s.*
  FROM Student s
  INNER JOIN StudentProduct sp ON s.id = sp.student_id
  INNER JOIN Product p ON sp.product_id = p.id
  WHERE p.name LIKE '%' + @productName + '%'
    AND p.price BETWEEN @minPrice AND @maxPrice;
END;
