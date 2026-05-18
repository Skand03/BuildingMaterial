import { addProduct, deleteProduct, deleteMessageAction } from './actions';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Message from '@/models/Message';
import { Trash2, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  let products = [];
  let messages = [];
  let dbError = null;

  try {
    await connectDB();
    
    // Fetch from MongoDB
    const productsDocs = await Product.find({}).sort({ createdAt: -1 }).lean();
    const messagesDocs = await Message.find({}).sort({ createdAt: -1 }).lean();
    
    // Convert _id to string for Client Components
    products = productsDocs.map(p => ({ ...p, _id: p._id.toString() }));
    messages = messagesDocs.map(m => ({ ...m, _id: m._id.toString() }));
  } catch (error) {
    console.error("Database connection error in AdminPage:", error.message);
    dbError = error.message;
  }

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Admin <span className="text-primary">Dashboard</span></h1>
        
        {dbError ? (
          <div className="card glass" style={{ borderColor: '#EF4444', background: 'rgba(239, 68, 68, 0.1)', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#EF4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚠️ Database Connection Failed
            </h2>
            <p style={{ color: '#CBD5E1', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              The secure Admin Dashboard is loaded, but it could not connect to your MongoDB Atlas cluster.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.2rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace', color: '#FCA5A5', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Error: {dbError}
            </div>
            
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>How to fix this:</h3>
            <ol style={{ color: '#94A3B8', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', lineHeight: '1.5' }}>
              <li>
                <strong>Check your credentials:</strong> The database returns <em>bad auth : authentication failed</em>. This means the password in your connection string is incorrect.
              </li>
              <li>
                <strong>Update Password in MongoDB Atlas:</strong> Log in to your <a href="https://cloud.mongodb.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>MongoDB Atlas</a> dashboard, go to <strong>Database Access</strong> on the left, click <strong>Edit</strong> on your user <em>VenzioAdmin</em>, click <strong>Edit Password</strong>, set it to your correct password, and click <strong>Update User</strong>.
              </li>
              <li>
                <strong>Verify your local connection string:</strong> Open your local project's <code>.env.local</code> file and make sure the password does not contain any angle brackets like <code>&lt;</code> or <code>&gt;</code> (the password should be exactly your password, e.g., <code>root123</code>).
              </li>
            </ol>
          </div>
        ) : (
          <>
        <div className="card glass" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageCircle className="text-primary" /> Customer Inquiries
          </h2>
          
          {messages.length === 0 ? (
            <p style={{ color: '#94A3B8' }}>No new inquiries. When someone submits a request, it will appear here.</p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {messages.map((msg) => (
                <div key={msg._id} style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-color)' }}>{msg.name}</h3>
                      <p style={{ fontSize: '0.9rem', color: '#94A3B8' }}>{new Date(msg.date).toLocaleDateString()}</p>
                    </div>
                    <form action={deleteMessageAction.bind(null, msg._id)}>
                      <button type="submit" style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </div>
                  
                  <div style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
                    <p style={{ color: '#CBD5E1' }}><strong>Email:</strong> {msg.email}</p>
                    <p style={{ color: '#CBD5E1' }}><strong>Phone:</strong> {msg.phone}</p>
                  </div>
                  
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    <p style={{ fontStyle: 'italic', color: '#E2E8F0', whiteSpace: 'pre-wrap' }}>"{msg.message}"</p>
                  </div>
                  
                  <a 
                    href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=Hello ${msg.name}, I received your request for Adarsh BuildMart regarding: "${msg.message.substring(0, 50)}..."`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn" 
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff', fontSize: '0.9rem', padding: '0.6rem' }}
                  >
                    <MessageCircle size={16} /> Reply on WhatsApp
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>Product Management</h2>

        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          
          {/* Add Product Form */}
          <div className="card glass" style={{ flex: '1 1 350px', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Add New Product</h3>
            <form action={addProduct}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#CBD5E1' }}>Product Name</label>
                <input type="text" name="name" className="input" placeholder="e.g. UltraTech Cement" required />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#CBD5E1' }}>Category</label>
                <select name="category" className="input" required style={{ appearance: 'none' }}>
                  <option value="Materials" style={{ color: '#000' }}>Materials</option>
                  <option value="Hardware" style={{ color: '#000' }}>Hardware</option>
                </select>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#CBD5E1' }}>Price</label>
                <input type="text" name="price" className="input" placeholder="e.g. ₹400 / bag" required />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#CBD5E1' }}>Image URL (Netlify Safe)</label>
                <input type="text" name="image" className="input" placeholder="e.g. https://example.com/image.png" />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Product</button>
            </form>
          </div>

          {/* Product List */}
          <div className="card glass" style={{ flex: '2 1 500px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Products</h3>
            {products.length === 0 ? (
              <p style={{ color: '#94A3B8' }}>No products found. Add some from the form.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {products.map((product) => (
                  <div key={product._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '50px', height: '50px', position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
                        <Image src={product.image && product.image.startsWith('http') ? product.image : '/featured_cement.png'} alt={product.name} layout="fill" objectFit="cover" />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem' }}>{product.name}</h4>
                        <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{product.category} | <span className="text-primary">{product.price}</span></p>
                      </div>
                    </div>
                    <form action={deleteProduct.bind(null, product._id)}>
                      <button type="submit" style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.5rem' }}>
                        <Trash2 size={20} />
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </>
    )}
      </div>
    </div>
  );
}
