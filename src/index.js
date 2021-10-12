import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'
import rootReducer from './reducers/rootReducer'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

var firebaseConfig = {
  apiKey: "AIzaSyCSMi2D_IZUzhQwhHaFmtQgrM-iTPvMSQM",
  authDomain: "krishi-221e1.firebaseapp.com",
  projectId: "krishi-221e1",
  storageBucket: "krishi-221e1.appspot.com",
  messagingSenderId: "355532993472",
  appId: "1:355532993472:web:8ff9e18482bd75e6ed4e25"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()

const reduxStore = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase) // redux bindings for firestore,  
  )
);
ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={firebaseConfig}
        dispatch={reduxStore.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <App />
      </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>

  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
