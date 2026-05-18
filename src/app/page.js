import Image from "next/image";
import { Truck, Hammer, ShieldCheck, PhoneCall } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="hero" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
          <Image src="/hero_construction.png" alt="Construction Hero" layout="fill" objectFit="cover" quality={100} priority />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.95))' }}></div>
        </div>
        
        <div className="container text-center animate-fade-in" style={{ zIndex: 1, marginTop: '80px' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
            Build Your Future With <span className="text-primary">AdarshBuildMart</span>
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 2.5rem', color: '#CBD5E1' }}>
            Bihar's premier supplier of high-quality construction materials and hardware. We deliver the foundation for your dreams with unmatched reliability and premium products.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="/products" className="btn btn-primary">Explore Products</a>
            <a href="/contact" className="btn btn-outline">Contact Us</a>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--background-dark)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why Choose <span className="text-primary">Us</span></h2>
            <p style={{ color: '#94A3B8', maxWidth: '600px', margin: '0 auto' }}>We bring industry-leading standards to every project, ensuring your construction is built to last.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="card glass text-center">
              <ShieldCheck size={48} className="text-primary" style={{ margin: '0 auto 1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Premium Quality</h3>
              <p style={{ color: '#94A3B8' }}>Only the highest grade materials from trusted manufacturers make it to our inventory.</p>
            </div>
            <div className="card glass text-center delay-100">
              <Truck size={48} className="text-primary" style={{ margin: '0 auto 1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Fast Delivery</h3>
              <p style={{ color: '#94A3B8' }}>Our robust logistics network ensures your materials arrive on-site, right when you need them.</p>
            </div>
            <div className="card glass text-center delay-200">
              <Hammer size={48} className="text-primary" style={{ margin: '0 auto 1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Expert Hardware</h3>
              <p style={{ color: '#94A3B8' }}>A comprehensive range of professional hardware tools for every building requirement.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'linear-gradient(to right, rgba(15, 23, 42, 1), rgba(30, 41, 59, 0.8))' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
            <div style={{ flex: '1 1 500px' }}>
              <div style={{ position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                <Image src="/featured_cement.png" alt="Featured Products" layout="fill" objectFit="cover" />
              </div>
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Featured <span className="text-primary">Materials</span></h2>
              <p style={{ color: '#94A3B8', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Our industrial-grade cement and concrete supplies are sourced directly from top manufacturers. Perfect for heavy-duty commercial projects or residential builds.
              </p>
              <ul style={{ marginBottom: '2.5rem', color: '#CBD5E1' }}>
                <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldCheck size={20} className="text-primary"/> High Compressive Strength</li>
                <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldCheck size={20} className="text-primary"/> Weather Resistant</li>
                <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldCheck size={20} className="text-primary"/> Bulk Order Discounts</li>
              </ul>
              <a href="/products" className="btn btn-primary">View All Materials</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Ready to start your project?</h2>
          <div className="glass" style={{ padding: '3rem', borderRadius: '16px', display: 'inline-block', border: '1px solid var(--primary-color)' }}>
            <PhoneCall size={48} className="text-primary" style={{ margin: '0 auto 1.5rem' }} />
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Call Us Today</h3>
            <p style={{ fontSize: '1.5rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>+91 98765 43210</p>
          </div>
        </div>
      </section>
    </>
  );
}
