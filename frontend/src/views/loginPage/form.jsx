import { useState } from "react";
import {
    Box,
    TextField,

} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from 'formik';
import * as yup from yup;
import Dropzone from 'react-dropzone';




const Form = () => {
    const [ pageType, setPageType] = useState('login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = pageType === 'login';
    const isRegister = pageType === 'register';

    const handleFromSubmit = async (values , onSubmitProps) => {};

    return (
        <Formik onSubmit={handleFromSubmit}>
            {({
                handleSubmit,
                setFieldValue,
            }) => (
                <Form onSubmit={handleSubmit}>
                    <Box display='grid'>
                          <TextField label= 'First Name' name="firstName"/> 
                          <TextField label= 'last Name' name="lastName"/>   
                          <TextField label= 'Location' name="location"/>
                          <TextField label= 'Occupation' name="occupation"/>                      
                    </Box>
                    <Box borderRadius="5px">
 
                    </Box>
                </Form>
            )}
        </Formik>
    )
}


export default Form