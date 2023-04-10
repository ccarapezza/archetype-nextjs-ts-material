import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoSharpsIcon from '@mui/icons-material/InfoSharp';
import SuperscriptSharpIcon from '@mui/icons-material/SuperscriptSharp';
import { Divider, Drawer, DrawerProps, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Link from '@/src/components/Link';
import { Box } from '@mui/system';

interface MenuItemData {
  id: string;
  icon?: JSX.Element;
  url?: string;
  children?: MenuItemData[];
}

const categories : Array<MenuItemData> = [
  {
    id: 'Home',
    icon: <HomeIcon />,
    url: '/'
  },
  {
    id: 'Test',
    children: [
      { id: 'About', icon: <InfoSharpsIcon />, url: '/about' },
      { id: 'Protected', icon: <SuperscriptSharpIcon />, url: '/protected/protected' }
    ],
  },
  /*
  {
    id: 'Build',
    children: [
      { id: 'Authentication', icon: <PeopleIcon /> },
      { id: 'Database', icon: <DnsRoundedIcon /> },
      { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
      { id: 'Hosting', icon: <PublicIcon /> },
      { id: 'Functions', icon: <SettingsEthernetIcon /> },
      { id: 'Machine learning', icon: <SettingsInputComponentIcon /> },
    ],
  },
  {
    id: 'Quality',
    children: [
      { id: 'Analytics', icon: <SettingsIcon /> },
      { id: 'Performance', icon: <TimerIcon /> },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    ],
  },
  */
];

const itemSx = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategorySx = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...itemSx, ...itemCategorySx, fontSize: 22, color: '#fff' }}>
          Paperbase
        </ListItem>
        
        {categories.map(({ id, children, icon, url }) => (
          children ? (
            <Box key={id} sx={{ bgcolor: '#101F33' }}>
              <ListItem sx={{ py: 2, px: 3 }}>
                {icon &&
                  <ListItemIcon sx={{ color: '#fff' }}>{icon}</ListItemIcon>
                }
                <ListItemText sx={{ color: '#fff', fontWeight: "bold" }}>
                  <Typography component="h5" sx={{ fontWeight: "bold" }}>{id}</Typography>
                </ListItemText>
              </ListItem>
              {children?.map(({ id: childId, icon, url: childUrl }) => (
                <Link key={id+"-"+childId} href={childUrl!}>
                  <ListItem disablePadding>
                    <ListItemButton selected={false} sx={itemSx}>
                      {icon &&
                        <ListItemIcon>{icon}</ListItemIcon>
                      }
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
              <Divider sx={{ mt: 2 }} />
            </Box>
          ) : (
            <Link key={id} href={url!}>
              <ListItem sx={{ ...itemSx, ...itemCategorySx }}>
                {icon &&
                  <ListItemIcon>{icon}</ListItemIcon>
                }
                <ListItemText>{id}</ListItemText>
              </ListItem>
            </Link>
          )
        ))}
      </List>
    </Drawer>
  );
}