const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    buyer_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seller_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    item_id: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    message: { type: String },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt timestamps
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
