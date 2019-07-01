import firebase from '../firebase';
import objectHash from 'object-hash';

const storageRef = firebase.storage().ref();

export const UploadFile = async (file, path) => {
  try {
    const hashedFileName = objectHash(file.name);
    const { ref } = await storageRef.child(`${path}/${hashedFileName}`).put(file);
    
    return ref.getDownloadURL();
  } catch(err) {
    return err;
  }
};