import React, { useContext } from 'react';
import { Grid, Typography, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { CircleLoader } from 'components'
import { bestSellersContext } from '../BestSellersProvider';
import { Link } from 'react-router-dom';
import theme from 'assets/theme';
import { applicationContext } from 'helpers/services';


let Results = () => {
    let { bookCategories } = useContext(applicationContext);

    let { isLoading, bestSellers } = useContext(bestSellersContext);

    return (
        <>
            {isLoading && <CircleLoader />}
            {isLoading === false &&
                <Grid container sx={{ paddingTop: theme.spacing(1) }}>
                    {bestSellers.length === 0 &&
                        <Grid item xs={12} sm={4} md={6} lg={2}>
                            <Typography variant="subtitle2">Sorry no books were found</Typography>
                        </Grid>
                    }
                    {bestSellers.map(bestSeller =>
                        <React.Fragment key={bestSeller.category}>
                            <Grid item xs={12}>
                                <Typography variant="h3" color="text.secondary">
                                    <strong>{bookCategories.find(x => x.key === bestSeller.category)?.value}&nbsp;&middot;&nbsp;{bestSeller.publishDate}</strong>
                                </Typography>
                            </Grid>
                            {bestSeller.books.map(book =>
                                <Grid key={book.isbn} item xs={12} sm={4} md={6} lg={2}>
                                    <Card sx={{ height: 400 }}>
                                        <Link to={`/book/${book.isbn}/${bestSeller.category}/${bestSeller.publishDate}/`}>
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
                                        <CardContent>
                                            <Typography>{book.title}</Typography>
                                            <Typography color="text.secondary">by {book.author}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}
                        </React.Fragment>
                    )}
                </Grid>
            }
        </>
    )
}

export default Results;