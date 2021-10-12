import React from 'react'
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import { isLoaded, isEmpty } from 'react-redux-firebase';
import * as authActions from '../actions/authActions'
import { connect } from 'react-redux';
import './nav.css'

function LoggedOut(props) {
    return (
        <ul className="logged-out">
            <li>
                <NavLink style={{textDecoration:"none"}} to="/signup">Signup</NavLink>
            </li>
            <li>
                <NavLink style={{textDecoration:"none"}} to="/login">Login</NavLink>
            </li>

        </ul>
    )
}

function NavBar(props) {

    return (
        <div className="nav">
            <NavLink style={{width:"10%", fontSize:"35px", marginLeft:"10px", textDecoration:"none"}} to='/' >Home</NavLink>
            <NavLink style={{width:"10%", fontSize:"25px",padding:"5px", backgroundColor:"rgb(224, 211, 211)",width:"20%",borderRadius:"5px",textAlign:"center", textDecoration:"none"}} to="fetch_normal">Fetch Normal</NavLink>
            {isLoaded(props.auth) && !isEmpty(props.auth)?<>
                <NavLink style={{width:"10%", fontSize:"25px",padding:"5px", backgroundColor:"rgb(224, 211, 211)",width:"20%",borderRadius:"5px",textAlign:"center", textDecoration:"none"}}to="/fetch_with_auth">FetchWithAuth</NavLink>
                <Button style={{backgroundColor:"rgb(224, 211, 211)", marginRight:"20px"}} variant="outlined" onClick={() => props.signOut()}>Signout</Button>
            </>:<LoggedOut />}
            
        </div>
    )
}
const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
    }
}
const mapDispatchTpProps = dispatch => {
    return {
        signOut: () => dispatch(authActions.signout())
    }
}
export default connect(mapStateToProps, mapDispatchTpProps)(NavBar)
