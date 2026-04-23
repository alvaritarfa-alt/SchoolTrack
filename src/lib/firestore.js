import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc, query, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export const createDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    throw new Error(`Failed to create document in ${collectionName}: ${error.message}`);
  }
};

export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error(`Document ${docId} does not exist in ${collectionName}`);
    }
  } catch (error) {
    throw new Error(`Failed to get document ${docId} from ${collectionName}: ${error.message}`);
  }
};

export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    throw new Error(`Failed to update document ${docId} in ${collectionName}: ${error.message}`);
  }
};

export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error(`Failed to delete document ${docId} from ${collectionName}: ${error.message}`);
  }
};

export const queryCollection = async (collectionName, ...queryConstraints) => {
  try {
    const q = query(collection(db, collectionName), ...queryConstraints);
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  } catch (error) {
    throw new Error(`Failed to query collection ${collectionName}: ${error.message}`);
  }
};