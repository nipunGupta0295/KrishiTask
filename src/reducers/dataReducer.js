import * as actionTypes from '../actions/actionsTypes';
import initialState from './initialState.json';
const dataReducer = (state=initialState.api_data, action) =>{
    switch(action.type) {
        case actionTypes.FETCH_DATA_REQUEST:
            return {...state, loading:true};
        case actionTypes.FETCH_DATA_SUCCESS:
            return {...state, loading:false, data: action.payload};
        case actionTypes.FETCH_DATA_FAILURE:
            return {...state, loading:false, error:action.payload};
        case actionTypes.SET_DATA:
            return {...state, data: action.payload};
        default:
            return state;    
    }
}

export default dataReducer;