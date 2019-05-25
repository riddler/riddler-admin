import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import LiquidEditor from './components/LiquidEditor';

import Dashboard from '../../dashboard/Dashboard';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

/*
export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Parcel v4-beta example
        </Typography>
        <MadeWithLove />
      </Box>
    </Container>
  );
}
*/

export default function App() {
  return (
    <div>
      <LiquidEditor />
    </div>
  );
}
