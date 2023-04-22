import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { bookContext } from "../../BookProvider";
import Header from './Header';

let BookInfo = () => {
    let { book } = useContext(bookContext);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Header title='Overview' />
            </Grid>
            <Grid item xs={12}>
                <Grid container sx={{ paddingLeft: 4 }}>
                    <Grid item xs={2}>
                        <Typography>Author</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography>{book.author}</Typography>
                    </Grid>
                    {/* <Grid item xs={2}>
                        <Typography>Company</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography>{service.employee.company}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>Department</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography>{service.employee.department}</Typography>
                    </Grid> */}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default BookInfo;