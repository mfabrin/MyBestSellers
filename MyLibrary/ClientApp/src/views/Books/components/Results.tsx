import { useContext } from 'react';
import { Grid, Typography, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, CardActionArea } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { CircleLoader } from 'components'
import { booksContext } from '../BooksProvider';
import { useNavigate } from 'react-router-dom';


let Results = () => {
    let navigate = useNavigate();

    let { isLoading, search, books } = useContext(booksContext);

    return (
        <>
            {isLoading && <CircleLoader />}
            {isLoading === false &&
                <Grid container>
                    {books.map(book =>
                        <Grid item xs={12} sm={4} md={6} lg={2}>
                            <Card>
                                <CardActionArea onClick={() => navigate(`/book/${book.category}/${search.pageNr}/${book.isbn}/`)}>
                                    <CardMedia
                                        component="img"
                                        image={book.image}
                                        alt={book.title}
                                    />
                                </CardActionArea>
                                <CardContent>
                                    <Typography color="text.secondary">
                                        {book.title}
                                    </Typography>
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