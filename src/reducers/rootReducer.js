import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dataReducer from './dataReducer';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import * as actionTypes from '../actions/actionsTypes';
import initialState from '../reducers/initialState.json';

const appReducer = combineReducers({
    firestore:firestoreReducer,
    firebase:firebaseReducer,
    auth: authReducer,
    api_data: dataReducer
})

const rootReducer = (state=initialState,action)=>{
    if(action.type===actionTypes.SIGN_OUT)
    {
        state=undefined;
    }
    return appReducer(state,action)

}

export default rootReducer