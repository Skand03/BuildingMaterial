'use server';

import { 
  getProducts as getDbProducts, 
  addProduct as addDbProduct, 
  deleteProduct as deleteDbProduct,
  getMessages as getDbMessages,
  addMessage as addDbMessage,
  deleteMessage as deleteDbMessage
} from '@/lib/localdb';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

export async function getProducts() {
  return await getDbProducts();
}

export async function addProduct(formData) {
  const name = formData.get('name');
  const category = formData.get('category');
  const price = formData.get('price');
  const imageFile = formData.get('image');
  
  let imageUrl = '/featured_cement.png';

  if (imageFile && imageFile.size > 0) {
    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name.replace(/\\s/g, '_')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      await fs.mkdir(uploadDir, { recursive: true });
      
      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(filepath, buffer);
      
      imageUrl = `/uploads/${filename}`;
    } catch (err) {
      console.error("Error saving image:", err);
    }
  }

  try {
    await addDbProduct({ name, category, price, image: imageUrl });
    revalidatePath('/admin');
    revalidatePath('/products');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id) {
  try {
    await deleteDbProduct(id);
    revalidatePath('/admin');
    revalidatePath('/products');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ---------------- Messages Actions ----------------

export async function getMessages() {
  return await getDbMessages();
}

import nodemailer from 'nodemailer';

export async function submitContactForm(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const message = formData.get('message');

  try {
    // 1. Save to local database
    await addDbMessage({ name, email, phone, message });
    revalidatePath('/admin');
    
    // 2. Send Email Notification
    try {
      // You need to configure this with a real email service or App Password in production.
      // This looks for EMAIL_USER and EMAIL_PASS in your .env.local file
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
      } else {
        console.log("Email credentials not found in environment variables. Email notification skipped.");
      }
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // We don't throw here because we still successfully saved the message to the database
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteMessageAction(id) {
  try {
    await deleteDbMessage(id);
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
