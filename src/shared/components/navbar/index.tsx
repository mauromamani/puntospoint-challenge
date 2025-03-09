import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Button } from '../ui';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { pushEventAnalytics } from 'src/core/ga4/util';

export const DesktopNavbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    pushEventAnalytics({
      action: 'profile',
      description: 'Opened profile menu',
    });
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        component='nav'
        sx={{
          width: '100%',
          height: 64,
          background: '#fff',
          justifyContent: {
            xs: 'start',
            md: 'center',
          },
          boxShadow: '0px 4px 10px 0px #0000001A',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        {isSmallScreen ? (
          <IconButton onClick={() => setOpenDrawer(true)}>
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            <Button variant='contained'>Dashboard</Button>
            <Button variant='text'>Clientes</Button>
            <Button variant='text'>Reglas de acumulación</Button>
          </>
        )}

        <Box
          sx={{
            position: 'absolute',
            right: 20,
          }}
        >
          <Stack direction='row' alignItems='center' gap='5px'>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Mauro {!isSmallScreen && 'Benjamin Mamani'}
            </Typography>

            <IconButton
              id='filter'
              onClick={handleClick}
              sx={{
                '& .MuiSvgIcon-root': {
                  color: '#000',
                },
              }}
            >
              <GridExpandMoreIcon />
            </IconButton>

            <Menu
              id='filter'
              anchorEl={anchorEl}
              open={open}
              disableScrollLock
              onClose={handleClose}
            >
              <MenuItem
                sx={{
                  fontWeight: 400,
                  fontSize: '16px',
                  color: '#1C1B1E',
                }}
              >
                Editar perfil
              </MenuItem>
              <MenuItem
                sx={{
                  fontWeight: 400,
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#1C1B1E',
                }}
              >
                <LogoutIcon /> Cerrar sesión
              </MenuItem>
            </Menu>
          </Stack>
        </Box>

        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          disableScrollLock
        >
          <List sx={{ width: 250 }}>
            {['Dashboard', 'Clientes', 'Reglas de acumulación'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
};
