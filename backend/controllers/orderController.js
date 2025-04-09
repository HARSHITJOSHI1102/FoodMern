import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId; // This comes from verifyToken
    const { address, items, amount } = req.body;

    if (!userId || !address || !items || !amount) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const order = await orderModel.create({
      userId,
      address,
      items,
      amount,
      status: "placed",
    });

    // Clear the cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { placeOrder };
