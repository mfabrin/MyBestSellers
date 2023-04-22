import { Grid, Typography } from "@mui/material";

interface IProps {
    title: string | React.ReactNode
    children?: React.ReactNode
}

let Header = (props: IProps) => {

    return (
        <Grid 
        container 
        spacing={0} 
        sx={{
            borderBottom: '1px solid #eeeeee',
            paddingTop: 0,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            marginBottom: 'auto',
            marginTop: 0,
            position: 'sticky',
            zIndex: 2,
            top: 49,
            backgroundColor: 'white'
        }}
        >
            <Grid item xs>
                <Typography variant="h3">{props.title}</Typography>
            </Grid>
            {props.children}
        </Grid>
    )
}

export default Header;