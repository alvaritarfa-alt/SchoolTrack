import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from './firebase';
import { createDocument } from './firestore';

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

export const registerUser = async (email, password, profileData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
      uid: user.uid,
      email: user.email,
      name: profileData.name || '',
      role: profileData.role || 'form_teacher',
      schoolId: profileData.schoolId || '',
      createdAt: new Date(),
      ...profileData,
    };

    await createDocument('users', userData);
    return user;
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(`Logout failed: ${error.message}`);
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(`Password reset failed: ${error.message}`);
  }
};