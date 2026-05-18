import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this product.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category.'],
  },
  price: {
    type: String,
    required: [true, 'Please provide a price.'],
  },
  image: {
    type: String,
    default: '/featured_cement.png'
  }
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
