'use client';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ContactPage as ContactPageIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

const DRAWER_WIDTH = 240;
const DRAWER_WIDTH_MOBILE = 60;
const navLinks = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Contacts', href: '/contacts', icon: <ContactPageIcon /> },
];

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Box
      component="nav"
      sx={{
        width: isMobile ? DRAWER_WIDTH_MOBILE : DRAWER_WIDTH,
        minHeight: '100ch',
        borderRight: 1.5,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        left: 0,
        overflowY: 'auto',
      }}
    >
      <Box>
        <Box
          sx={{
            p: 2,
            ml: isMobile ? 0 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'flex-start',
            textDecoration: 'none',
            cursor: 'pointer',
            gap: 1,
          }}
          onClick={() => router.push('/')}
        >
          <SvgIcon>
            <svg
              width="23"
              height="25"
              viewBox="0 0 23 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.861 0.678432C11.5724 0.619071 11.2747 0.619071 10.9861 0.678432C10.6525 0.747049 10.3543 0.914073 10.1172 1.04686L10.0526 1.08296L2.01776 5.54674C1.99555 5.55908 1.97266 5.57169 1.9492 5.58461C1.69824 5.72284 1.3827 5.89664 1.14038 6.15959C0.930873 6.38693 0.772327 6.65639 0.675339 6.94993C0.563159 7.28946 0.564471 7.6497 0.565515 7.93621C0.565613 7.96298 0.565708 7.98911 0.565708 8.01452V16.828C0.565708 16.8534 0.565613 16.8795 0.565515 16.9063C0.564471 17.1928 0.563159 17.553 0.675339 17.8926C0.772327 18.1861 0.930875 18.4556 1.14038 18.6829C1.3827 18.9458 1.69824 19.1197 1.9492 19.2579C1.97266 19.2708 1.99555 19.2834 2.01776 19.2957L10.0526 23.7595L10.1172 23.7956C10.3543 23.9284 10.6525 24.0954 10.9861 24.1641C11.2747 24.2234 11.5724 24.2234 11.861 24.1641C12.1947 24.0954 12.4929 23.9284 12.7299 23.7956L12.7946 23.7595L20.8294 19.2957C20.8392 19.2903 20.8491 19.2848 20.8592 19.2792C20.8719 19.2722 20.8848 19.2651 20.8979 19.2579C21.1489 19.1197 21.4644 18.9459 21.7067 18.6829C21.9163 18.4556 22.0748 18.1861 22.1718 17.8926C22.284 17.553 22.2827 17.1928 22.2816 16.9063C22.2815 16.8795 22.2814 16.8534 22.2814 16.828V8.01452C22.2814 7.98911 22.2815 7.96298 22.2816 7.93621C22.2827 7.6497 22.284 7.28946 22.1718 6.94993C22.0748 6.65639 21.9163 6.38693 21.7067 6.15959C21.4644 5.89663 21.1489 5.72283 20.8979 5.5846L20.897 5.58412C20.8739 5.57137 20.8513 5.55892 20.8294 5.54674L12.7946 1.08296L12.7299 1.04685C12.4929 0.91407 12.1947 0.747049 11.861 0.678432ZM11.1072 2.98125C11.2717 2.88984 11.3557 2.84365 11.4184 2.81343L11.4236 2.81094L11.4288 2.81343C11.4914 2.84365 11.5754 2.88984 11.7399 2.98125L18.9598 6.99229L11.4235 11.1791L3.88727 6.99231L11.1072 2.98125ZM2.73728 8.83761L10.3377 13.0601L10.3378 21.4338L3.07237 17.3975C2.89869 17.301 2.81002 17.2512 2.74781 17.2116L2.74256 17.2082L2.74217 17.202C2.73773 17.1283 2.73728 17.0266 2.73728 16.828V8.83761Z"
                fill="#2A2A2A"
              />
            </svg>
          </SvgIcon>
          {!isMobile && (
            <Typography variant="h6" noWrap component="div">
              Connectify
            </Typography>
          )}
          {!isMobile && (
            <Box sx={{ ml: '2rem' }}>
              <UserButton />
            </Box>
          )}
        </Box>
        <List>
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              pathname.split('/')[1] == link.href.split('/')[1];
            return (
              <ListItem
                key={link.href}
                disablePadding
                sx={{ px: isMobile ? 0 : 1 }}
              >
                <ListItemButton
                  component={Link}
                  href={link.href}
                  selected={isActive}
                  sx={{
                    justifyContent: isMobile ? 'center' : 'flex-start',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: isMobile ? 0 : 40,
                      justifyContent: 'center',
                    }}
                  >
                    {link.icon}
                  </ListItemIcon>
                  {!isMobile && <ListItemText primary={link.label} />}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      {/* Todo Avatar */}
      {isMobile && (
        <Box
          sx={{
            height: '75%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <UserButton />
        </Box>
      )}
    </Box>
  );
}

export default Navbar;
