import * as actionTypes from './actionsTypes';

export const registerRequest = () => {
    return {
        type: actionTypes.REGISTER_REQUEST
    }
}
export const registerSuccess = (res) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        payload: res
    }
}

export const registerFailed = (err) => {
    return {
        type: actionTypes.REGISTER_FAILED,
        error: err
    }
}

export const register = (userData) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch(registerRequest());
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log(userData);
        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password).then(async (data) => {
            await firestore.collection("user").doc(firebase.auth.uid).set({
                email: userData.email,
                password: userData.password,
                gender: userData.gender
            })
            dispatch(registerSuccess(data.user.uid));
        }).catch((err) =>{
            dispatch(registerFailed(err));
            setTimeout(() =>{
                dispatch({type: actionTypes.REMOVE_ERROR});
            }, 2000)
        })
    }
}

export const signout =() => {
    console.log("heeloo")
    return async (dispatch,getState,{getFirebase,getFirestore}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type:actionTypes.SIGN_OUT})
        })
    }
}

export const signInRequest =()=>{
    return {type:actionTypes.SIGN_IN_REQUEST}
}

export const signInSuccess = ()=>{
    return {
        type:actionTypes.SIGN_IN_SUCCESS
    }
} 

export const signInFailed = (err)=>{
    return {
    type:actionTypes.SIGN_IN_FAILED,
    error:err

    }
}

export const signIn= (userData)=>{
    return async(dispatch,getState,obj)=>{
        console.log("hello");
        console.log(obj);
        const {getFirebase,getFirestore} = obj
        dispatch(signInRequest())
        console.log(getFirebase);
        const firebase = getFirebase();
        try{
            let data = await firebase.auth().signInWithEmailAndPassword(userData.email,userData.password);
            dispatch(signInSuccess())
        }
        catch(err)
        {
            dispatch(signInFailed(err))
            setTimeout(()=>{
                dispatch({type: actionTypes.REMOVE_ERROR})
            },2000)
        }

    }
}