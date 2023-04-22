import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Stack, Grid } from '@mui/material';

interface IProps {
    children?: React.ReactNode
}

let NavBar = ({ children }: IProps) => {

    return (
        <AppBar color="inherit" elevation={0} position="sticky" style={{ borderBottom: '1px solid #eeeeee' }}>
            <Toolbar variant="dense" >
                <Grid container spacing={1} alignItems='center'>
                    <Grid item xs={2}>
                        <Stack direction="row" display='flex' textAlign='center'>
                            <Link to="/">
                                <img height={22} src="https://picsum.photos/200/300" />
                            </Link>
                            {process.env.REACT_APP_ENV !== "production" &&
                                <Typography>
                                    <b>{process.env.REACT_APP_ENV}</b>
                                </Typography>
                            }
                        </Stack>
                    </Grid>
                    <Grid item xs>
                        {children}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;