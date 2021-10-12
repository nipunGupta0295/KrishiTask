import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const fetchDataRequest = ()=>{
    return{
        type:actionTypes.FETCH_DATA_REQUEST
    }
}
export const fetchDataSuccess = (users)=>{
    return{
        type:actionTypes.FETCH_DATA_SUCCESS,
        payload:users
    }
}
export const fetchDataFailure =(error)=>{
    return {
        type:actionTypes.FETCH_DATA_FAILURE,
        payload:error
    }
}

export const setData = () => {
    let ldata = JSON.parse(localStorage.getItem("userdata"));
    console.log("LS", ldata);
    if(ldata) {
        return {
            type: actionTypes.SET_DATA,
            payload: ldata
        }
    }else {
        return {
            type: actionTypes.SET_DATA,
            payload: []
        }
    }
}

export const fetchData = () =>{
    return async (dispatch, getaData, {getFirbase, getFirestore}) =>{
        dispatch(fetchDataRequest())
        try{
            let res = await axios.get('https://thekrishi.com/test/mandi?lat=28.44108136&lon=77.0526054&ver=89&lang=hi&crop_id=10');
            //console.log(res.data);
            let apidata = res.data;
            localStorage.setItem("userdata", JSON.stringify(apidata["data"]["other_mandi"]))
            dispatch(fetchDataSuccess(apidata["data"]["other_mandi"]))
        }
        catch(e) {
            dispatch(fetchDataFailure(e));
        }
    }
}