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
  
  export const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, { displayName, photoURL });  // Actualizamos el perfil
  };

  export const uploadFile = (file, fileType) => {
    const userId = auth.currentUser.uid;  // Obtenemos el ID único del usuario
    const fileRef = ref(storage, ${userId}/${fileType}/${file.name});  // Creamos una referencia de archivo
    return uploadBytes(fileRef, file).then(snapshot => {
      return getDownloadURL(snapshot.ref);  // Retornamos la URL de descarga
    });
  };
  



 