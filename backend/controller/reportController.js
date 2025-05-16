import dbConnect from "../dbConnect/dbConnect.js";
const db = await dbConnect();

 const getHighestRevenueProduct = async (req, res) => {
  const sql = `
  SELECT 
    p.name AS product_name, 
    SUM(COALESCE(o.quantity, 0) * o.price) AS revenue
  FROM orders o
  JOIN products p ON o.product_id = p.id
  GROUP BY p.name
  ORDER BY revenue DESC
  LIMIT 1;
`;

  try {
    const [result] = await db.query(sql);
    res.json({
      question: "Which product had the highest total revenue?",
      sql,
      result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "SQL error", details: err });
  }
};



 const getTopSpendingCustomers = async (req, res) => {
  const sql = `
    SELECT u.full_name AS customer_name, 
           SUM(COALESCE(o.quantity, 0) * o.price) AS total_spent
    FROM orders o
    JOIN users u ON o.user_id = u.id
    GROUP BY u.full_name
    ORDER BY total_spent DESC
    LIMIT 2;
  `;


  try {
    const [result] = await db.query(sql);
    res.json({
      question: "Who are the top 2 customers by total spending?",
      sql,
      result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "SQL error", details: err });
  }
};



const getMonthlySalesTrend = async (req, res) => {
  const sql = `
    SELECT DATE_FORMAT(o.order_date, '%Y-%m') AS month, 
       SUM(o.quantity * o.price) AS total_sales
FROM orders o
GROUP BY month
ORDER BY month DESC
LIMIT 6;
  `;

  try {
    const [result] = await db.query(sql);
    res.json({
      question: "What is the monthly sales trend for the last 6 months?",
      sql,
      result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "SQL error", details: err });
  }
};



const getLowStockProducts = async (req, res) => {
  const sql = `
    SELECT name, stock_quantity 
    FROM products
    WHERE stock_quantity < 26;
  `;

  try {
    const [result] = await db.query(sql);
    res.json({
      question: "Which products are low in stock(less than 26 unit) ",
      sql,
      result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "SQL error", details: err });
  }
};




export {getHighestRevenueProduct, getTopSpendingCustomers,getMonthlySalesTrend, getLowStockProducts}