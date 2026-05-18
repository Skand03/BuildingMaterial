import Image from "next/image";
import { Search } from "lucide-react";
import { getProducts } from "@/lib/localdb";

export const dynamic = 'force-dynamic';

export default async function Products() {
  const products = await getProducts();

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our <span className="text-primary">Products</span></h1>
          <p style={{ color: '#94A3B8', maxWidth: '600px', margin: '0 auto' }}>
            Browse our extensive catalog of premium construction materials and professional hardware tools.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div className="glass" style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '50px', width: '100%', maxWidth: '500px' }}>
            <Search size={20} className="text-primary" style={{ marginRight: '0.8rem' }} />
            <input type="text" placeholder="Search materials or hardware..." style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '1rem' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
          {products.map((product) => (
            <div key={product._id} className="card glass" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                <Image src={product.image || '/featured_cement.png'} alt={product.name} layout="fill" objectFit="cover" />
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--primary-color)', color: '#000', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {product.category}
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                <p style={{ color: 'var(--primary-color)', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>{product.price}</p>
                <button className="btn btn-outline" style={{ width: '100%' }}>Inquire Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
