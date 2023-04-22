import { useContext } from 'react';
import { Grid, Typography, Card, CardHeader, Avatar, CardMedia, CardContent, CardActions, IconButton } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { CircleLoader, ViewIconButton } from 'components'
import { booksContext } from '../BooksProvider';
import { red } from '@mui/material/colors';


let Results = () => {

    let { isLoading, books } = useContext(booksContext);

    return (
        <Grid container>
            <Grid item xs>
                {isLoading && <CircleLoader />}
                {isLoading === false &&
                    <>
                        {books.map(book =>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            R
                                        </Avatar>
                                    }
                                    action={<ViewIconButton link={`/book/${book.isbn}`} />}
                                    title={book.title}
                                    subheader={book.author}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={book.image}
                                    alt={book.title}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {book.description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        )}
                    </>
                }
            </Grid>
        </Grid>
    )
}

export default Results;