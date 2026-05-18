'use server';

import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Message from '@/models/Message';
import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';

export async function addProduct(formData) {
  const name = formData.get('name');
  const category = formData.get('category');
  const price = formData.get('price');
  const image = formData.get('image'); // Now expects a URL string, not a file
  
  try {
    await connectDB();
    await Product.create({ 
      name, 
      category, 
      price, 
      image: image || '/featured_cement.png' 
    });
    
    revalidatePath('/admin');
    revalidatePath('/products');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(id);
    revalidatePath('/admin');
    revalidatePath('/products');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ---------------- Messages Actions ----------------

export async function submitContactForm(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const message = formData.get('message');

  try {
    await connectDB();
    
    // 1. Save to MongoDB
    await Message.create({ name, email, phone, message });
    revalidatePath('/admin');
    
    // 2. Send Email Notification
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'adarshmohit9334@gmail.com',
          subject: `New Request from ${name} - Adarsh BuildMart`,
          text: `You have received a new request on Adarsh BuildMart!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);
        console.log("Email notification sent successfully.");
      }
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteMessageAction(id) {
  try {
    await connectDB();
    await Message.findByIdAndDelete(id);
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
