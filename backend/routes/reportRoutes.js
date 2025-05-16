
import express from 'express';
import { getHighestRevenueProduct, getLowStockProducts, getMonthlySalesTrend, getTopSpendingCustomers } from '../controller/reportController.js';

const reportRoutes = express.Router();

reportRoutes.get('/demo-revenue',getHighestRevenueProduct);
reportRoutes.get('/demo-top-customers', getTopSpendingCustomers);
reportRoutes.get('/demo-monthly-sales', getMonthlySalesTrend);
reportRoutes.get('/demo-low-stock', getLowStockProducts);

export default reportRoutes;
