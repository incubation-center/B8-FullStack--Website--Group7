// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const firebase =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const storage = getStorage(firebase);

const profileStorageRef = ref(storage, 'user_profile');

export async function uploadImage(file: File, id: string) {
  // const fileExtension = file.name.split('.').pop();
  const newFileNames = `${id}`;
  // since without file extension the image upload still works
  // so I don't need to add file extension to the file name

  const renamedFile = new File([file], newFileNames, {
    type: file.type,
    lastModified: file.lastModified
  });

  const imageRef = ref(profileStorageRef, renamedFile.name);

  const imageUrl = await uploadBytes(imageRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .catch((error) => {
      console.log(error);
    });

  return imageUrl;
}

export async function updateCoverImage(
  file: File,
  id: string,
  category: string
) {
  // const fileExtension = file.name.split('.').pop();
  const newFileNames = `${id}`;
  // since without file extension the image upload still works
  // so I don't need to add file extension to the file name

  const renamedFile = new File([file], newFileNames, {
    type: file.type,
    lastModified: file.lastModified
  });

  const imageRef = ref(ref(storage, category), renamedFile.name);

  const imageUrl = await uploadBytes(imageRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .catch((error) => {
      console.log(error);
    });

  return imageUrl;
}

export async function uploadBookCover({
  id,
  file,
  category
}: {
  id: any;
  file: File;
  category: string;
}) {
  // const fileExtension = file.name.split('.').pop();
  const newFileNames = `${id}`;
  // since without file extension the image upload still works
  // so I don't need to add file extension to the file name

  const renamedFile = new File([file], newFileNames, {
    type: file.type,
    lastModified: file.lastModified
  });

  let categoryRef = category.toLowerCase().replace(' ', '_');

  const coverRef = ref(storage, categoryRef);

  const imageRef = ref(coverRef, renamedFile.name);

  const imageUrl = await uploadBytes(imageRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .catch((error) => {
      console.log(error);
    });

  return imageUrl;
}
