import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    itemNumber: { type: Number, required: true, unique: true },
    itemName: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt timestamps automatically
  }
);

const Item = mongoose.model("Item", ItemSchema);
export default Item;
