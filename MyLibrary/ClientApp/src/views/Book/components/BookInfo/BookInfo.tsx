import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { bookContext } from "../../BookProvider";
import Header from './Header';
import Info from './Info';

let BookInfo = () => {
    let { book } = useContext(bookContext);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Header title='Overview' />
            </Grid>
            <Grid item xs={12}>
                <Grid container alignItems="center" sx={{ paddingLeft: 4 }}>
                    <Info title="ISBN" value={book.isbn} />
                    <Info title="Author" value={book.author} />
                    <Info title="Contributor" value={book.contributor} />
                    <Info title="Description" value={book.description} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default BookInfo;