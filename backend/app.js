import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from "cors";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Server is running");
});

// defining routes
app.use('/api/reports', reportRoutes);

app.listen(port, () => {
  console.log('Server running on',port);
});
