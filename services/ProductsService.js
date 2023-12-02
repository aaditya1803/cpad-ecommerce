import { app, db } from '../firebaseConfig.js';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);


// Collection name in Firestore
const COLLECTION_NAME = 'products';

export async function getProducts() {
  const productsCollection = collection(db, COLLECTION_NAME);
  const productsSnapshot = await getDocs(productsCollection);

  const products = [];
  productsSnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
}

export async function getProduct(id) {
console.log(id);
  const productDocRef = doc(db, COLLECTION_NAME, String(id));
  const productDocSnapshot = await getDoc(productDocRef);

  if (productDocSnapshot.exists()) {
    return { id: productDocSnapshot.id, ...productDocSnapshot.data() };
  } else {
    return null; // Product not found
  }
}