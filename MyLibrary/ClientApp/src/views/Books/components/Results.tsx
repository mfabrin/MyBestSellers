import { useContext } from 'react';
import { Grid, Typography, Card, CardHeader, Avatar, CardMedia, CardContent, CardActions, IconButton } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { CircleLoader, ViewIconButton } from 'components'
import { booksContext } from '../BooksProvider';
import { red } from '@mui/material/colors';


let Results = () => {

    let { isLoading, books } = useContext(booksContext);

    return (
        <>
            {isLoading && <CircleLoader />}
            {isLoading === false &&
                <Grid container>
                    {books.map(book =>
                        <Grid item xs={12} sm={4} md={6} lg={3}>
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
                        </Grid>
                    )}
                </Grid>
            }
        </>
    )
}

export default Results;