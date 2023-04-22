import { Grid, CircularProgress } from '@mui/material';


let CircleLoader = () => {
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyItems="center"
        >
            <Grid item xs>
                <CircularProgress size={60} thickness={3} />
            </Grid>
        </Grid>
    )
}

export default CircleLoader;