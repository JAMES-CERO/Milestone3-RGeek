import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    useMediaQuery,

} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import EditOutlinedIcon from '@mui/icons-material/EditOutlinedIcon';
import { Formik } from 'formik';
import * as yup from yup;
import { setLogin } from "../../state";
import Dropzone from 'react-dropzone';



const Form = () => {
    const [pageType, setPageType] = useState('login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = pageType === 'login';
    const isRegister = pageType === 'register';

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value])
        }
        formData.append('picturePath', values.picture.name);

        const saveUserRespond = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );

        const saveUser = await saveUserRespond.json();
        onSubmitProps.resetForm();

        if (saveUser) {
            setPageType('login');
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInRespond = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(values)
            }
        );
        const loggedIn = await loggedInRespond.json();
        onSubmitProps = resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            )
            navigate("/home");
        }
    }


const handleFromSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);

};

return (
    <Formik onSubmit={handleFromSubmit}>
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
            yup
        }) => (
            <Form onSubmit={handleSubmit}>
                <Box display='grid'>
                    {isRegister && (
                        <>
                            <TextField label='First Name' name="firstName" />
                            <TextField label='last Name' name="lastName" />
                            <TextField label='Location' name="location" />
                            <TextField label='Occupation' name="occupation" />
                            <Box borderRadius="5px" gridColumn="span 4">
                                <Dropzone acceptedFiles='.jpg, .jpeg, .png' multiple={false} onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])} >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box {...getRootProps()} >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <p> Add picture HERE!</p>
                                            ) : (
                                                <Box>
                                                    <Typography>{values.picture.name}</Typography>
                                                    <EditOutlinedIcon />
                                                </Box>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                        </>
                    )}

                    <TextField label='Email' name="email" />
                    <TextField label='Password' name="password" />
                </Box>

                <Box>
                    <Button fullWidth type="submit" backgrounColor='black' color="red">
                        {isLogin ? 'LOGIN' : 'REGISTER'};
                    </Button>
                    <Typography onClick={() => {
                        setPageType(isLogin ? 'register' : 'login');
                        resetForm();
                    }}>
                        {isLogin ? "Don't have an account? Sign up HERE" : "Already have an account ? Login HERE"}
                    </Typography>
                </Box>
            </Form>
        )}
    </Formik>
)
}


export default Form