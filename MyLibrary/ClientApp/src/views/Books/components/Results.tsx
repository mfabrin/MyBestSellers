import { useContext } from 'react';
import { Grid, Typography, Card, CardMedia, CardContent, CardActions, CardActionArea, Checkbox } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { CircleLoader } from 'components'
import { booksContext } from '../BooksProvider';
import { useNavigate } from 'react-router-dom';
import theme from 'assets/theme';


let Results = () => {
    let navigate = useNavigate();

    let { isLoading, search, books, updateFavourite } = useContext(booksContext);

    return (
        <>
            {isLoading && <CircleLoader />}
            {isLoading === false &&
                <Grid container sx={{ paddingTop: theme.spacing(1) }}>
                    {books.map(book =>
                        <Grid key={book.isbn} item xs={12} sm={4} md={6} lg={2}>
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
                                    <Checkbox
                                        icon={<FavoriteBorder />}
                                        checkedIcon={<Favorite />}
                                        checked={book.isFavourite}
                                        onChange={async (e) => await updateFavourite(book.isbn)}
                                    />
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