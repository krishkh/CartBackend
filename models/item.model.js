const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  seller_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  condition: { type: String, required: true },
  images: { type: [String], default: [] },
  sold: { type: Boolean, default: false }
}, {
  timestamps: true // This adds createdAt and updatedAt timestamps
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;
