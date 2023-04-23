import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { bookContext } from "../BookProvider";

interface IProps {
    title: string | React.ReactNode
    children?: React.ReactNode
}

let Header = (props: IProps) => {
    let { isSaving, saveBook } = useContext(bookContext);

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
            <Grid item>
                <Button
                    color='primary'
                    variant='contained'
                    disabled={isSaving}
                    onClick={async () => await saveBook()}
                >
                    {isSaving && <><CircularProgress size={16} color="primary" />&nbsp;&nbsp;</>}Save
                </Button>
            </Grid>
        </Grid>
    )
}

export default Header;