import fs from 'fs/promises';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data.json');
const messagesFile = path.join(process.cwd(), 'messages.json');

const defaultData = [
  { _id: '1', name: 'UltraTech Premium Cement', category: 'Materials', price: '₹400 / bag', image: '/featured_cement.png' },
  { _id: '2', name: 'TMT Steel Bars (12mm)', category: 'Materials', price: '₹60 / kg', image: '/hero_construction.png' },
  { _id: '3', name: 'Red Bricks (Class A)', category: 'Materials', price: '₹8 / piece', image: '/featured_cement.png' },
  { _id: '4', name: 'Heavy Duty Drill Machine', category: 'Hardware', price: '₹3,500', image: '/hero_construction.png' },
  { _id: '5', name: 'Plumbing PVC Pipes (1 inch)', category: 'Hardware', price: '₹120 / meter', image: '/featured_cement.png' },
  { _id: '6', name: 'Waterproofing Chemical', category: 'Materials', price: '₹450 / liter', image: '/hero_construction.png' }
];

export async function getProducts() {
  try {
    const data = await fs.readFile(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(dataFile, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    console.error("Error reading db:", error);
    return [];
  }
}

export async function addProduct(product) {
  const products = await getProducts();
  const newProduct = { ...product, _id: Date.now().toString() };
  products.push(newProduct);
  await fs.writeFile(dataFile, JSON.stringify(products, null, 2));
  return newProduct;
}

export async function deleteProduct(id) {
  const products = await getProducts();
  const filtered = products.filter(p => p._id !== id);
  await fs.writeFile(dataFile, JSON.stringify(filtered, null, 2));
  return true;
}

// ---------------- Messages DB ----------------

export async function getMessages() {
  try {
    const data = await fs.readFile(messagesFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(messagesFile, JSON.stringify([], null, 2));
      return [];
    }
    console.error("Error reading messages db:", error);
    return [];
  }
}

export async function addMessage(messageData) {
  const messages = await getMessages();
  const newMessage = { 
    ...messageData, 
    _id: Date.now().toString(),
    date: new Date().toISOString()
  };
  // Add new messages to the beginning of the list
  messages.unshift(newMessage);
  await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));
  return newMessage;
}

export async function deleteMessage(id) {
  const messages = await getMessages();
  const filtered = messages.filter(m => m._id !== id);
  await fs.writeFile(messagesFile, JSON.stringify(filtered, null, 2));
  return true;
}
