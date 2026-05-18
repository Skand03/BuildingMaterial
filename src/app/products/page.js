import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductCatalog from '@/components/ProductCatalog';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  await connectDB();
  const productsDocs = await Product.find({}).sort({ createdAt: -1 }).lean();
  const products = productsDocs.map(p => ({ ...p, _id: p._id.toString() }));

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container">
        <ProductCatalog initialProducts={products} />
      </div>
    </div>
  );
}
