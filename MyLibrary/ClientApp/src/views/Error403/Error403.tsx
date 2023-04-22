import { Typography, Container } from '@mui/material';


let Error403 = () => {

    return (
        <Container maxWidth="md">
            <Typography align="center" variant="h1">
                Something is wrong with your user
            </Typography>
            <Typography align="center" variant="h2">
                Try to logout and login again: if nothing change ask for technical support.
            </Typography>
        </Container>
    )
}

export default Error403;