import React, { ReactElement } from 'react';
import { Container, SxProps } from '@mui/material';

interface Props {
  children?: ReactElement | ReactElement[];
  sx?: SxProps;
}

const Layout = ({ sx, children }: Props): ReactElement => {
  const containerSx = {
    height: '100%',
    overflowX: 'none',
    paddingTop: '24px',
    position: 'relative',
    ...sx,
  } as SxProps;

  return (
    <Container sx={containerSx} maxWidth="sm">
      {children}
    </Container>
  );
};

export default Layout;
