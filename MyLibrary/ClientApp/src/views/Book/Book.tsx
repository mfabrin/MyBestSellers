import { useContext } from "react";
import { CardMedia, Grid } from "@mui/material";
import { bookContext } from './BookProvider';
import { Header, BookInfo } from './components'


let Book = () => {

    let { isLoading, book } = useContext(bookContext);

    return (
        <div>
            {isLoading === false &&
                <>
                    <Header title={book.title} />
                    <Grid container>
                        <Grid item>
                            <CardMedia
                                component="img"
                                width={250}
                                sx={{ width: 250, border: '1px solid #fafafa' }}
                                src={book.image}
                            />
                        </Grid>
                        <Grid item xs>
                            <Grid item xs={12}>
                                <BookInfo />
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            }
        </div>
    )
}

export default Book;