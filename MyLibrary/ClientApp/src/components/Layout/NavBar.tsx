import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Stack, Grid, List, ListItem, ListItemText } from '@mui/material';
import theme from 'assets/theme';

let NavBar = () => {
    let location = useLocation();

    return (
        <AppBar color="inherit" elevation={0} position="sticky" style={{ borderBottom: '1px solid #eeeeee' }}>
            <Toolbar variant="dense" >
                <Grid container spacing={1} alignItems='center'>
                    <Grid item xs={1}>
                        <Stack direction="row" display='flex'>
                            <Link to="/">
                                <img src="https://picsum.photos/200/200" height="56" />
                            </Link>
                            {process.env.REACT_APP_ENV !== "production" &&
                                <Typography>
                                    <b>{process.env.REACT_APP_ENV}</b>
                                </Typography>
                            }
                        </Stack>
                    </Grid>
                    <Grid item xs>
                        <List
                            disablePadding
                            component="nav"
                            style={{ listStyle: 'none', display: 'inline-flex' }}
                        >
                            <ListItem style={{ textTransform: 'uppercase', }} component={Link} to='/books'>
                                <ListItemText
                                    primary={
                                        <strong style={{
                                            fontSize: 13,
                                            fontWeight: 800,
                                            paddingBottom: '16px',
                                            borderBottom: location.pathname === '/books' ? `2px solid ${theme.palette.primary.main}` : '0px',
                                            color: location.pathname === '/books' ? `${theme.palette.primary.main}` : 'black',
                                        }}>
                                            Books
                                        </strong>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;