import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Date from './DatePicker';
import NavbarBreadcrumbs from './Nav';
import MenuButton from './Menu';
import Color from './Theme/Color';


const Header = () => {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Date />
        <MenuButton showBadge aria-label="Open notifications"> {/*getting notification*/}
          <NotificationsRoundedIcon />
        </MenuButton>
        <Color />
      </Stack>
    </Stack>
  );
}
export default Header;