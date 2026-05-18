import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductCatalog from '@/components/ProductCatalog';

export const dynamic = 'force-dynamic';

const defaultProducts = [
  { _id: '1', name: 'UltraTech Premium Cement', category: 'Materials', price: '₹400 / bag', image: '/featured_cement.png' },
  { _id: '2', name: 'TMT Steel Bars (Fe 550)', category: 'Materials', price: '₹65,000 / ton', image: '/hero_construction.png' },
  { _id: '3', name: 'Brass Ball Valve 1/2"', category: 'Hardware', price: '₹180 / piece', image: '/featured_cement.png' },
  { _id: '4', name: 'Premium Wall Putty', category: 'Materials', price: '₹800 / 40kg', image: '/hero_construction.png' },
  { _id: '5', name: 'Heavy Duty Hammer', category: 'Hardware', price: '₹350 / piece', image: '/featured_cement.png' },
  { _id: '6', name: 'High-Grade Concrete Mixer', category: 'Materials', price: '₹28,000 / unit', image: '/hero_construction.png' }
];

export default async function ProductsPage() {
  let products = defaultProducts;
  let dbError = null;

  try {
    await connectDB();
    const productsDocs = await Product.find({}).sort({ createdAt: -1 }).lean();
    if (productsDocs && productsDocs.length > 0) {
      products = productsDocs.map(p => ({ ...p, _id: p._id.toString() }));
    }
  } catch (error) {
    console.error("Database connection error in ProductsPage:", error.message);
    dbError = error.message;
  }

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container">
        {dbError && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.2)', 
            border: '1px solid #EF4444', 
            color: '#FCA5A5', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '2rem',
            fontSize: '0.95rem'
          }}>
            <strong>⚠️ Database Connection Warning:</strong> Could not connect to MongoDB Atlas. Showing default/cached catalog. (Error: {dbError})
          </div>
        )}
        <ProductCatalog initialProducts={products} />
      </div>
    </div>
  );
}

