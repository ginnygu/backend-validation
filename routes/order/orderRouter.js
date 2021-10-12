var express = require("express");
var router = express.Router();
var { jwtMiddleware } = require("../users/lib/authMiddleware");
const {
  getAllOrders,
  createOrder,
  deleteOrderById,
  updateOrderById,
} = require("./controller/orderController");

/* GET home page. */
router.get("/", jwtMiddleware, getAllOrders);

router.post("/create-order", jwtMiddleware, createOrder);

router.delete("/delete-order-by-id/:id", jwtMiddleware, deleteOrderById);

router.put("/update-order-by-id/:id", jwtMiddleware, updateOrderById);

module.exports = router;
