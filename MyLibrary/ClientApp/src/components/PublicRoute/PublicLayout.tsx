import React from 'react';
import { NavBar } from 'components';

interface IProps {
    children: React.ReactNode
}

const PublicLayout = ({ children }: IProps) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}

export default PublicLayout;