import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, default: '/featured_cement.png' },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
