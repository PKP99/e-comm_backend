import { Router } from "express";
import Cart from "./Cart";
// import Orders from "./Orders";
// import Products from "./Products";
import Users from "./Users";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/cart", Cart);
// router.use("/orders", Orders);
// router.use("/products", Products);
router.use("/auth", Users);

// Export the base-router
export default router;
