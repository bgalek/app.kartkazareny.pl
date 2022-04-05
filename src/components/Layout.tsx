import React, { ReactElement } from 'react';
import { Container } from '@mui/material';

interface Props {
    children: ReactElement;
}

const Layout = ({ children }: Props): ReactElement => (
    <Container maxWidth="sm" component="main" sx={{
        height: 'calc(100vh - 124px)',
        overflowX: 'clip',
        overflowY: 'scroll',
        marginTop: 2,
        position: 'relative'
    }}>
        {children}
    </Container>
);

export default Layout;
