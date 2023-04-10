import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Navigator from './Navigator';
import Header from './Header';
import theme from '@/src/theme';
import Copyright from '../Copyright';
import FloatingDiv from '../FloatingWindow';
import GlobalChatBox from '../GlobalChatBox';
import { useSession } from "next-auth/react"

const drawerWidth = 256;

export default function Layout({ children } : { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const { data: session } = useSession();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (<>
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            {isSmUp ? null : (
                <Navigator
                    PaperProps={{ style: { width: drawerWidth } }}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                />
            )}
            <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                sx={{ display: { sm: 'block', xs: 'none' } }}
            />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Header onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flex: 1, bgcolor: '#eaeff1' }}>
                { children }
            </Box>
            <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
                <Copyright />
            </Box>
        </Box>
    </Box>
    {session&&
        <FloatingDiv key="chat-window" title='Chat'>
            <GlobalChatBox/>
        </FloatingDiv>
    }
  </>
  );
}