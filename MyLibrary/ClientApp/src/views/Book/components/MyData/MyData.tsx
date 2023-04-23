import { useContext } from "react";
import { Grid, TextField, Checkbox, FormControl, RadioGroup, FormControlLabel, Radio, Rating, TextareaAutosize } from "@mui/material";
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { bookContext } from "../../BookProvider";
import Header from './Header';
import EditData from './EditData';

let MyData = () => {
    let { book, updateBook } = useContext(bookContext);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Header title='My data' />
            </Grid>
            <Grid item xs={12}>
                <Grid container alignItems="center" sx={{ paddingLeft: 4 }}>
                    <EditData
                        title="Is my favourite"
                        value={
                            <Checkbox
                                size="small"
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                checked={book.isFavourite}
                                onChange={(e) => updateBook({ ...book, isFavourite: e.target.checked })}
                            />
                        }
                    />
                    <EditData
                        title="Read"
                        value={
                            <RadioGroup row name="read"
                                value={book.isRead}
                                onChange={(e) => updateBook({ ...book, isRead: e.target.value === "true" })}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>
                        }
                    />
                    {book.isRead === true &&
                        <EditData
                            title="My rank"
                            value={
                                <Rating
                                    name="rank"
                                    value={book.rank}
                                    onChange={(event, newValue) => updateBook({ ...book, rank: newValue ?? 0 })}
                                />
                            }
                        />
                    }
                    <EditData
                        title="Notes"
                        value={
                            <TextareaAutosize
                                minRows={8}
                                maxRows={16}
                                style={{ padding: 8, width: 464 }}
                                value={book.notes}
                                onChange={(e) => updateBook({ ...book, notes: e.target.value })}
                            />
                        }
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MyData;