import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//import { seedDatabase} from '../seed';
const config = {
apiKey: "AIzaSyBuh6Auow_OBSjy3ZzPoT_fbr99czENbBI",
authDomain: "polaroid-76f88.firebaseapp.com",
projectId: "polaroid-76f88",
storageBucket: "polaroid-76f88.appspot.com",
messagingSenderId: "818942370205",
appId: "1:818942370205:web:15e2ee9032b2c21d808f74"};

const firebase = Firebase.initializeApp(config);
const { FieldValue} = Firebase.firestore;
//seedDatabase(firebase);
//console.log('firebase', firebase);

export { firebase, FieldValue};