
import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" className="m-2">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://github.com/ccarapezza/">
        C.Carapezza GitHub Profile
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}