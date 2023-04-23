import { Grid, Typography } from '@mui/material';

interface IProps {
    title: string
    value: any
}

let EditData = (props: IProps) => {
    return (
        <>
            <Grid item xs={2}>
                <Typography>{props.title}</Typography>
            </Grid>
            <Grid item xs={10}>
                {props.value}
            </Grid>
        </>
    )
}

export default EditData;