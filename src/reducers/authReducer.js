import * as actionTypes from '../actions/actionsTypes';
import initialState from './initialState.json'
export default function authReducer(state = initialState.auth, action) {
    switch(action.type){
        case actionTypes.SIGN_IN_FAILED:
            return {...state,loading:false,error:action.error}
        case actionTypes.SIGN_IN_REQUEST:
            return {...state,loading:true}
        case actionTypes.SIGN_IN_SUCCESS:
            return {...state,loading:false}
        case actionTypes.REGISTER_REQUEST:
            return {...state, loading:true};
        case actionTypes.REGISTER_SUCCESS:
            return {...state, loading:false, user: action.payload};
        case actionTypes.REGISTER_FAILED:
            return {...state, loading:false, error: action.error};
        default:
            return state
            
    }


}