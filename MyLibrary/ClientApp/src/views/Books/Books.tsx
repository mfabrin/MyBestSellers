import { Grid } from '@mui/material';
import { Filters, Results } from './components';

let Books = () => {
    return (
        <Grid container>
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