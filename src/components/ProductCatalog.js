'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, MessageCircle } from 'lucide-react';

export default function ProductCatalog({ initialProducts }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  const filteredProducts = initialProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
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
            style={{ paddingLeft: '3rem', marginBottom: 0 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="text-primary" size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Sidebar Categories */}
        <div style={{ flex: '1 1 250px' }}>
          <div className="card glass" style={{ position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Categories</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['All Products', 'Materials', 'Hardware'].map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setSelectedCategory(cat)}
                    style={{ 
                      background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem',
                      color: selectedCategory === cat ? 'var(--primary-color)' : '#CBD5E1', 
                      fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                      transition: 'color 0.3s' 
                    }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ flex: '3 1 700px' }}>
          {filteredProducts.length === 0 ? (
            <div className="card glass" style={{ textAlign: 'center', padding: '4rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#94A3B8' }}>No products found matching your search.</h3>
              <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={() => { setSearchQuery(''); setSelectedCategory('All Products'); }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {filteredProducts.map((product, index) => (
                <div key={product._id} className="card glass animate-fade-in" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', animationDelay: `${index * 0.1}s` }}>
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
                    <a 
                      href={`https://wa.me/919334721693?text=Hello Adarsh BuildMart, I am interested in buying: ${product.name} (${product.price}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary" 
                      style={{ width: '100%', marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <MessageCircle size={18} /> Enquire Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}
