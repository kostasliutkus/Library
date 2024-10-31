import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const isHandset = useMediaQuery('(max-width:600px)');

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const drawerContent = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
                    <ListItemText primary="Home" />
                </ListItem>
                <Divider />
                <ListItem button component={Link} to="/books" onClick={toggleDrawer(false)}>
                    <ListItemText primary="Books" />
                </ListItem>
                <Divider />
                <ListItem button component={Link} to="/reservations" onClick={toggleDrawer(false)}>
                    <ListItemText primary="Reservations" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    {isHandset ? (
                        <React.Fragment>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="left"
                                open={drawerOpen}
                                onClose={toggleDrawer(false)}
                            >
                                {drawerContent}
                            </Drawer>
                        </React.Fragment>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button color="inherit" component={Link} to="/">
                                Home
                            </Button>
                            <Button color="inherit" component={Link} to="/books">
                                Books
                            </Button>
                            <Button color="inherit" component={Link} to="/reservations">
                                Reservations
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
