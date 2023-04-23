import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Grid, List, ListItem, ListItemText } from '@mui/material';
import theme from 'assets/theme';

interface IPage {
    url: string
    title: string
}

let NavBar = () => {
    let location = useLocation();

    const pages: IPage[] = [
        { url: '/bestsellers', title: 'Best Sellers' },
        { url: '/mylibrary', title: 'My Library' }
    ]

    return (
        <AppBar color="inherit" elevation={0} position="sticky" style={{ borderBottom: '1px solid #eeeeee' }}>
            <Toolbar variant="dense" >
                <Grid container spacing={1} alignItems='center'>
                    <Grid item>
                        <Link to="/bestsellers">
                            <img height={48} src="/logo.png" style={{ paddingTop: 8 }} />
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <List
                            disablePadding
                            component="nav"
                            style={{ listStyle: 'none', display: 'inline-flex' }}
                        >
                            {pages.map(page =>
                                <ListItem key={page.url} style={{ textTransform: 'uppercase', }} component={Link} to={page.url}>
                                    <ListItemText
                                        primary={
                                            <span style={{
                                                fontSize: 13,
                                                paddingBottom: 16,
                                                whiteSpace: 'nowrap',
                                                borderBottom: location.pathname === page.url ? `2px solid ${theme.palette.primary.main}` : '0px',
                                                color: location.pathname === page.url ? `${theme.palette.primary.main}` : 'black',
                                            }}>
                                                {page.title}
                                            </span>
                                        }
                                    />
                                </ListItem>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;