import React from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import {isLoaded,isEmpty} from 'react-redux-firebase';
function PrivateRoute({ component: Component, ...remainingProps }) {
    //console.log(authFirebase);
    console.log("PR", remainingProps.authFirebase)
    return (
        <Route {...remainingProps}
            render={({ props }) => 
                isLoaded(remainingProps.authFirebase) && !isEmpty(remainingProps.authFirebase) ? <Component {...props} /> : <Redirect to='/fetch_with_auth' />
            
            }
        />
    )
}

const mapStateToProps = state => {
    return {
        authFirebase: state.firebase.auth,
    }
}
const mapDispatchTpProps = state => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchTpProps)(PrivateRoute);