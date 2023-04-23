import { useContext } from 'react';
import { Grid, Typography, Card, CardMedia, CardContent, CardActions, CardActionArea, Checkbox } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { CircleLoader } from 'components'
import { myLibraryContext } from '../MyLibraryProvider';
import { Link, useNavigate } from 'react-router-dom';
import theme from 'assets/theme';


let Results = () => {
    let navigate = useNavigate();

    let { isLoading, search, books, updateFavourite } = useContext(myLibraryContext);

    return (
        <>
            {isLoading && <CircleLoader />}
            {isLoading === false &&
                <Grid container sx={{ paddingTop: theme.spacing(1) }}>
                    {books.length === 0 &&
                        <Grid item xs={12} sm={4} md={6} lg={2}>
                            <Typography variant="subtitle2">Sorry no books were found</Typography>
                        </Grid>
                    }
                    {books.map(book =>
                        <Grid key={book.isbn} item xs={12} sm={4} md={6} lg={2}>
                            <Card>
                                <Link to={`/book/${book.isbn}/${book.category}/${book.publishDate}/`}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image={book.image}
                                            alt={book.title}
                                            height="250"
                                            sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                                        />
                                    </CardActionArea>
                                </Link>
                                <CardContent sx={{ height: 80 }}>
                                    <Typography>{book.title}</Typography>
                                    <Typography color="text.secondary">by {book.author}</Typography>
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