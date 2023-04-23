import { Grid, Typography } from '@mui/material';

interface IProps {
    title: string
    value: string
}

let Info = (props: IProps) => {
    return (
        <>
            <Grid item xs={2}>
                <Typography>{props.title}</Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography>{props.value}</Typography>
            </Grid>
        </>
    )
}

export default Info;