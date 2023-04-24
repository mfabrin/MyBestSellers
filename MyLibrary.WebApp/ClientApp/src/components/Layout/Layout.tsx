import React, { useContext } from 'react';
import { Container } from '@mui/material';
import theme from 'assets/theme';
import { applicationContext } from 'helpers/services';
import { CircleLoader } from 'components';
import NavBar from './NavBar';

interface IProps {
    children: React.ReactNode
}

const Layout = ({ children }: IProps) => {
    let { isLoading } = useContext(applicationContext);

    return (
        <>
            <NavBar />

            <Container sx={{ paddingTop: theme.spacing(1) }}>
                {isLoading === true && <CircleLoader />}
                {isLoading === false && <>{children}</>}
            </Container>
        </>
    );
}

export default Layout;