import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { bookContext } from "../BookProvider";
import Field from './Field';
import { applicationContext } from "helpers/services";

let BookInfo = () => {
    let { bookCategories } = useContext(applicationContext);
    let { book } = useContext(bookContext);

    return (
        <Grid container alignItems="center" sx={{ paddingLeft: 4 }}>
            <Field title="ISBN" value={<Typography>{book.isbn}</Typography>} />
            <Field title="Category" value={<Typography>{bookCategories.find(x => x.key === book.category)?.value}</Typography>} />
            <Field title="Author" value={<Typography>{book.author}</Typography>} />
            <Field title="Contributor" value={<Typography>{book.contributor}</Typography>} />
            <Field title="Description" value={<Typography>{book.description}</Typography>} />
        </Grid>
    );
}

export default BookInfo;