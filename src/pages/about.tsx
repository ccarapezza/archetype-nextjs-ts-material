import { Fragment } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@/src/components/Link';
import PageHeader from '../components/PageHeader';
import { IconButton, Tooltip } from '@mui/material';
import { Help as HelpIcon } from '@mui/icons-material';

export default function About() {
  return (<Fragment>
    <PageHeader
      title="About"
      className="bg-[#0089e5]"
      toolbar={
        <Tooltip title="Help">
            <IconButton color="inherit">
                <HelpIcon />
            </IconButton>
        </Tooltip>
      }
    />
    <Container maxWidth="lg">
      <Box className="flex flex-col justify-center items-center my-4">
        <Typography variant="h4" component="h1" gutterBottom>
          About page...
        </Typography>
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
        </Box>
      </Box>
    </Container>
  </Fragment>
  );
}