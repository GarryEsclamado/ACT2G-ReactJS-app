import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

function StartFirebase(){
  const firebaseConfig = {
    apiKey: "AIzaSyCiLRYRsRzH8SnzndkjHDLfKA7Ax43Ij1Q",
    authDomain: "react-student-99a90.firebaseapp.com",
    projectId: "react-student-99a90",
    storageBucket: "react-student-99a90.appspot.com",
    messagingSenderId: "317275221065",
    appId: "1:317275221065:web:837b6d5062cedd7b562398",
    measurementId: "G-K7YSZX296T"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);



        return getDatabase (app);

}

export default StartFirebase;



    
    

   
