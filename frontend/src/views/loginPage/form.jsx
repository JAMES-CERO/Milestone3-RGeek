import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as yup from "yup";
import { setLogin } from "../../state";
import Dropzone from 'react-dropzone';
import FlexMUI from "../../components/FlexMUI";

const registerSchema = yup.object().shape({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required'),
    picture: yup.string().required('required'),
    location: yup.string().required('required'),
    occupation: yup.string().required('required'),
})

const loginSchema = yup.object().shape({
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required'),
})

const inicialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: "",
    location: "",
    occupation: "",
};

const inicialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {

    const [pageType, setPageType] = useState('login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = pageType === 'login';
    const isRegister = pageType === 'register';
    const { palette } = useTheme();
    const noMobileScreen = useMediaQuery("(min-width: 1000px)");

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
        onSubmitProps.resetForm()

        if (saveUser) {
            setPageType('login');
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInRespond = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(values)
            }
        );
        const loggedIn = await loggedInRespond.json();
        onSubmitProps.resetForm();
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
        <Formik onSubmit={handleFromSubmit}
            initialValues={isLogin ? inicialValuesLogin : inicialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}>
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box display='grid' gap="30px" gridTemplateColumns="repeat(4, minxmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: noMobileScreen ? undefined : "span 4" }
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField label='First Name' name="firstName" onChange={handleChange} onBlur={handleBlur} value={values.firstName}
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField label='Last Name' name="lastName" onChange={handleChange} onBlur={handleBlur} value={values.lastName}
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField label='Location' name="location" onChange={handleChange} onBlur={handleBlur} value={values.location}
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField label='Occupation' name="occupation" onChange={handleChange} onBlur={handleBlur} value={values.occupation}
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <Box border={`5px solid ${palette.background.alt}`} borderRadius="5px" gridColumn="span 4">
                                    <Dropzone acceptedFiles='.jpg, .jpeg, .png' multiple={false} onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])} >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box {...getRootProps()}
                                                p="1rem" border={`2px dashed ${palette.primary.main}`}
                                                sx={{"&:hover": {cursor: "pointer"}}}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p> Add your profile picture Here!</p>
                                                ) : (
                                                    <FlexMUI>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexMUI>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}

                        <TextField label='Email' name="email" onChange={handleChange} onBlur={handleBlur} value={values.email}
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField label='Password' name="password" onChange={handleChange} onBlur={handleBlur} value={values.password}
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    <Box>
                        <Button fullWidth type="submit" 
                                sx={{ backgrounColor: palette.primary.main,
                                      color: palette.background.alt, m: '2rem 0', p: '1rem',
                                      "&:hover" : { color: palette.primary.main}
                                }}
                        >
                            {isLogin ? 'LOGIN' : 'Create new Account'}
                        </Button>
                        <Typography onClick={() => {
                            setPageType(isLogin ? 'register' : 'login');
                            resetForm();
                            }}
                            sx ={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover" : {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}
                        >
                            {isLogin ? "Sign in to continue" : "Already have an account ? Login Here"}
                        </Typography>
                    </Box>
   
                </form>
            )}
        </Formik>
    )
};


export default Form;