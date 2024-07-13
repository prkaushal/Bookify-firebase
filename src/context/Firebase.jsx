import { useContext, createContext , useState , useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {getFirestore , collection ,addDoc , getDocs, doc , getDoc, query , where} from 'firebase/firestore'
import {getStorage , ref , uploadBytes , getDownloadURL} from 'firebase/storage'


const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyD1UxuWajkN66QMc01ilw9CljL5g4bYRSo",
  authDomain: "bookify-cabff.firebaseapp.com",
  projectId: "bookify-cabff",
  storageBucket: "bookify-cabff.appspot.com",
  messagingSenderId: "193006372215",
  databseURL : "https://console.firebase.google.com/u/0/project/bookify-cabff/database/bookify-cabff-default-rtdb/data/~2F",
  appId: "1:193006372215:web:0e033ecef60f73dd870d72"
};

export const useFirebase = () => useContext(FirebaseContext);
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


export const FirebaseProvider = (props) => {
  
  const [user , setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(firebaseAuth , (user) => {
      if(user) setUser(user);
      else setUser(null);
    })
  } , [])
  
  
  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signInWithEmailAndPass = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };


  const handleCreateNewListing = async (name , isbn , price , cover) => {
      const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
      const uploadResults =  await uploadBytes(imageRef , cover);
      return await addDoc(collection(firestore , 'books') , {
        name,
        isbn,
        price,
        imageURL : uploadResults.ref.fullPath,
        userID: uploadResults.ref.fullPath,
        userEmail : user.email,
        displayName: user.displayName,
        photoURL: user.photoURL, 
      })
    }  

    const listAllBooks = () => {
      return getDocs(collection(firestore , "books"))
    }


    const getImageURL = (path) => {
      return getDownloadURL(ref(storage , path));
    };

    const placeOrder = async (bookId , qty) => {
      const collectionRef = collection(firestore , "books", bookId , "orders");
      const result = await addDoc(collectionRef,{
        userId: user.uid,
        userEmail : user.email,
        displayName: user.displayName,
        photoURl: user.photoURL,
        qty: Number(qty),
      });
      return result;
    }

    const fetchMyBooks = async( userId )=> {
      if(!user) return null;
      const collectionRef = collection(firestore , "books");
      const q = query(collectionRef , where("userID" , "==" , userId));

      const result = await getDocs(q);
      return result;
    }

    const getBookById = async(id) => {
        const  docRef = doc(firestore, 'books' , id);
        const result = await getDoc(docRef);
        
        return result;

    }

    const getOrders = async(bookId) => {
        const collectionRef = collection(firestore , "books" , bookId , "orders");
        const result = await getDocs(collectionRef);
        return result;
    }
    console.log(user);

  const isLoggedIn = user ? true : false ;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinWithGoogle,
        signInWithEmailAndPass,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrders,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
