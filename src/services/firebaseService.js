import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Función para obtener productos desde la colección "items"
export const getProductos = async () => {
    const productosCollection = collection(db, 'items');
    const snapshot = await getDocs(productosCollection);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
};

// Función para crear una orden de compra en la colección "ordenes"
export const createOrder = async (orderData) => {
    try {
        const docRef = await addDoc(collection(db, 'ordenes'), orderData);
        return docRef.id;
    } catch (error) {
        console.error('Error al crear la orden:', error);
        throw error;
    }
};
