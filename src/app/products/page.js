import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Image from 'next/image';
import { Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Products() {
  await connectDB();
  const productsDocs = await Product.find({}).sort({ createdAt: -1 }).lean();
  const products = productsDocs.map(p => ({ ...p, _id: p._id.toString() }));

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our <span className="text-primary">Products</span></h1>
            <p style={{ color: '#94A3B8', maxWidth: '600px' }}>
              Browse our comprehensive catalog of high-grade construction materials and professional hardware tools.
            </p>
          </div>
          
          <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="input" 
              style={{ paddingLeft: '3rem' }}
            />
            <Search className="text-primary" size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          
          <div style={{ flex: '1 1 250px' }}>
            <div className="card glass" style={{ position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Categories</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><a href="#" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>All Products</a></li>
                <li><a href="#" style={{ color: '#CBD5E1', transition: 'color 0.3s' }}>Construction Materials</a></li>
                <li><a href="#" style={{ color: '#CBD5E1', transition: 'color 0.3s' }}>Hardware & Tools</a></li>
                <li><a href="#" style={{ color: '#CBD5E1', transition: 'color 0.3s' }}>Plumbing & Electrical</a></li>
                <li><a href="#" style={{ color: '#CBD5E1', transition: 'color 0.3s' }}>Paints & Finishes</a></li>
              </ul>
            </div>
          </div>

          <div style={{ flex: '3 1 700px' }}>
            {products.length === 0 ? (
              <div className="card glass" style={{ textAlign: 'center', padding: '4rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#94A3B8' }}>No products available yet.</h3>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {products.map((product) => (
                  <div key={product._id} className="card glass" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                      <Image 
                        src={product.image && product.image.startsWith('http') ? product.image : '/featured_cement.png'} 
                        alt={product.name} 
                        layout="fill" 
                        objectFit="cover" 
                      />
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {product.category}
                      </div>
                    </div>
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                      <p style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        {product.price}
                      </p>
                      <button className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>Enquire Now</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
