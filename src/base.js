import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDo_qr_b7Zy1bno7EE54Uv_7wlxMZUtuW8",
    authDomain: "fresh-sea-food.firebaseapp.com",
    databaseURL: "https://fresh-sea-food.firebaseio.com",
    projectId: "fresh-sea-food",
    storageBucket: "fresh-sea-food.appspot.com",
    messagingSenderId: "304564027211"
};
const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export default base;