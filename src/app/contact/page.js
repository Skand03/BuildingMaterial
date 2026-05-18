'use client';

import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { submitContactForm } from "@/app/admin/actions";

export default function Contact() {
  const [status, setStatus] = useState(null);

  async function handleSubmit(formData) {
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setStatus("success");
      document.getElementById("contact-form").reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get in <span className="text-primary">Touch</span></h1>
          <p style={{ color: '#94A3B8', maxWidth: '600px', margin: '0 auto' }}>
            Have a project in mind or need a bulk order? Contact us today for the best quotes on materials and hardware.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '5rem' }}>
          <div className="card glass">
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Contact Information</h2>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem' }}>
              <MapPin className="text-primary" size={24} style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Our Store Location</h4>
                <p style={{ color: '#94A3B8' }}>Main Market Road,<br />Patna, Bihar 800001,<br />India</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem' }}>
              <Phone className="text-primary" size={24} style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Phone Number</h4>
                <p style={{ color: '#94A3B8' }}>+91 93347 21693</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem' }}>
              <Mail className="text-primary" size={24} style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Email Address</h4>
                <p style={{ color: '#94A3B8', wordBreak: 'break-all' }}>adarshmohit9334@gmail.com</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <Clock className="text-primary" size={24} style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Business Hours</h4>
                <p style={{ color: '#94A3B8' }}>Monday - Saturday: 8:00 AM - 8:00 PM<br />Sunday: Closed</p>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <a href="https://wa.me/919334721693" target="_blank" rel="noopener noreferrer" className="btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff' }}>
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="card glass">
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Send a Request</h2>
            {status === 'success' && (
              <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22C55E', color: '#4ADE80', borderRadius: '8px', marginBottom: '1rem' }}>
                Message sent successfully! We will contact you soon.
              </div>
            )}
            {status === 'error' && (
              <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', color: '#FCA5A5', borderRadius: '8px', marginBottom: '1rem' }}>
                Failed to send message. Please try again.
              </div>
            )}
            
            <form id="contact-form" action={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <input type="text" name="name" className="input" placeholder="Your Name" required />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <input type="email" name="email" className="input" placeholder="Your Email" required />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <input type="tel" name="phone" className="input" placeholder="Phone Number (e.g. +91...)" required />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <textarea name="message" className="input" placeholder="What materials do you need?" rows="5" required style={{ resize: 'vertical' }}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Request</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
