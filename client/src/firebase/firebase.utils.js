import firebase from 'firebase/app';
import 'firebase/firestore'; // access to database
import 'firebase/auth'; // access to authentication

// config object from project firebase console
const config = {
    apiKey: "AIzaSyC9l7x8HnPQxelxBsAwE_6mrAwwBsUYiR4",
    authDomain: "crwn-db-1c011.firebaseapp.com",
    databaseURL: "https://crwn-db-1c011.firebaseio.com",
    projectId: "crwn-db-1c011",
    storageBucket: "crwn-db-1c011.appspot.com",
    messagingSenderId: "840840056396",
    appId: "1:840840056396:web:a6fa514491f478b90b6ee9",
    measurementId: "G-3HRVCXMD13"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } =  userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user, ', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const addCollectionsAndItems = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}

export const auth = firebase.auth(); // to access authentication in our project
export const firestore = firebase.firestore(); // to access database in our project

// google sign in authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// google sign in popup
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;