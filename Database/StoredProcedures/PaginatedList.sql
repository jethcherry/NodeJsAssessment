CREATE PROCEDURE paginateList
  @offset INT,
  @limit INT
AS
BEGIN
  SELECT *
  FROM (
      SELECT *,
             ROW_NUMBER() OVER (ORDER BY id) AS RowNum
      FROM Product
  ) AS ProductsWithRowNumbers
  WHERE RowNum > @offset
    AND RowNum <= @offset + @limit;
END;
