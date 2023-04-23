import { Grid } from '@mui/material';
import { Filters, Results } from './components';
import theme from 'assets/theme';

let Books = () => {
    return (
        <Grid container sx={{ padding: theme.spacing(2) }}>
            <Grid item xs={12}>
                <Filters />
            </Grid>
            <Grid item xs={12}>
                <Results />
            </Grid>
        </Grid>
    )
}

export default Books;