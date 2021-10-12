import React from 'react'
import Button from '@mui/material/Button';
import * as dataActions from '../actions/dataAction';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import './data.css'
function FetchWithAuth(props) {
    console.log(props.data.length)
    const [adata, setaData] = useState(props.data);
    const dataHandler = () => {
        props.putData();
    }

    useEffect(() => {
        props.setData();
    }, [])

    useEffect(() => {
        setaData(props.data);
    }, [props])

    return (
        <div className="data-container">
            <Button style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} variant="contained" onClick={dataHandler}>FetchWithAuth</Button>
            {console.log(adata.length)}
            {
                adata.length == 0 ? <></> :
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">District</TableCell>
                                    <TableCell align="right">State</TableCell>
                                    <TableCell align="right">KM</TableCell>
                                    <TableCell align="right">Latitude</TableCell>
                                    <TableCell align="right">Longitude</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {adata.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align="right">{row.district}</TableCell>
                                        <TableCell align="right">{row.state}</TableCell>
                                        <TableCell align="right">{row.km}</TableCell>
                                        <TableCell align="right">{row.lat}</TableCell>
                                        <TableCell align="right">{row.lng}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.api_data.data,
        auth: state.firebase.auth,

    }
}

const mapDispatchTpProps = dispatch => {
    return {
        putData: () => dispatch(dataActions.fetchData()),
        setData: () => dispatch(dataActions.setData())
    }
}

export default connect(mapStateToProps, mapDispatchTpProps)(FetchWithAuth)
