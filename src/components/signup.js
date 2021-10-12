import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import * as authActions from '../actions/authActions'
import { connect } from 'react-redux';
import {useHistory} from "react-router";

const theme = createTheme();

function SignUp(props) {

    const [gender, setGender] = useState("Male");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (props.auth.user != null) {
            history.push('/fetch_normal')
        }
    }, [props.auth])

    const submitHandler = (event) => {
        console.log(props.register);
        if(password === confirmPassword) {
            props.register({ email, password, gender });
        }else{
            alert("confirm password and password are not same");
        }
        
    }

    const genderHandler = (event) => {
        setGender(event.target.value);
    }

    const emailHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const confirmpasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            value={email}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={emailHandler}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            value={password}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={passwordHandler}
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            value={confirmPassword}
                            required
                            fullWidth
                            name="Confirm Password"
                            label="Confirm Password"
                            type="password"
                            id="password"
                            onChange={confirmpasswordHandler}
                            autoComplete="current-password"
                        />
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            value={gender}
                            onChange={genderHandler}
                            helperText="Please select your currency"
                        >
                            <MenuItem value="Male">
                                Male
                            </MenuItem>
                            <MenuItem value="Female">
                                Female
                            </MenuItem>
                        </TextField>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={submitHandler}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/login" variant="body2">
                                    Already have an account?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchTpProps = (dispatch) => {
    return {
        register: (userData) => dispatch(authActions.register(userData)),
    }
}

export default connect(mapStateToProps, mapDispatchTpProps)(SignUp)