import { Box, Typography } from "@mui/material";

const LoginPage = () => {
    return (
        <Box>
            <Box width='100%' textAlign='center'>
            <Typography
                fontWeight='bold'
                fontSize= '32px'
                color='blue'
                backgroundColor='purple'
            >
                RGeeks
            </Typography>
            </Box>

            <Box width="50%" backgroundColor='green'>
                <Typography fontWeight="500" variant="h5">
                    Welcome to Red Geeks!
                </Typography>
            </Box>
        </Box>)
}

export default LoginPage;