import React, { useContext } from 'react';
import { CircleLoader } from 'components';
import { applicationContext } from 'helpers/services';
import NavBar from './NavBar';
import { Container } from '@mui/material';
import theme from 'assets/theme';

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