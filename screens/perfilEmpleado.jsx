import { auth, storage } from '../Firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';


export const getUserData = () => {
    const user = auth.currentUser;  
    if (user) {
      return { 
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
    }
    return null;  
  };
  
  