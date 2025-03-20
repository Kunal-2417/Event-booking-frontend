import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import app from './config';

const auth = getAuth(app);
const db = getFirestore(app);

// Signup function (Firebase only)
export const signupWithEmail = async (email, password, role) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save user to Firestore
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    role: role,
    uid: user.uid,
  });

  // ✅ Return userCredential (ID token is fetched in Signup.jsx)
  return userCredential;
};

// Login function
export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) {
    throw new Error('User role not found');
  }

  const userData = userDoc.data();
  console.log(userData)
  return { user, role: userData.role };
};

// Logout
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};

export { auth, logoutUser };
