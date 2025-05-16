import dotenv from "dotenv";
dotenv.config();
import mysql from 'mysql2/promise';

const dbConnect = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Connected to MySQL database.');
    return connection;  // return the connection if you need it
  } catch (error) {
    console.log('Database connection failed:');
    console.log(error);
    
  }
};

export default dbConnect;
