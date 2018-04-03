import * as firebase from 'firebase';
import credentials from '../../credentials';

const prodConfig = {
  apiKey: credentials.API_KEY,
  authDomain: credentials.AUTH_DOMAIN,
  databaseURL: credentials.DATABASE_URL,
  projectId: credentials.PROJECT_ID,
  storageBucket: credentials.STORAGE_BUCKER,
  messagingSenderId: credentials.MESSAGING_SENDER_ID,
};

const devConfig = {
  apiKey: credentials.API_KEY,
  authDomain: credentials.AUTH_DOMAIN,
  databaseURL: credentials.DATABASE_URL,
  projectId: credentials.PROJECT_ID,
  storageBucket: credentials.STORAGE_BUCKER,
  messagingSenderId: credentials.MESSAGING_SENDER_ID,
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
