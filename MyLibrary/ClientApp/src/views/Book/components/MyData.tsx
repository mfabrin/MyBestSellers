import { useContext } from "react";
import { Grid, Checkbox, RadioGroup, FormControlLabel, Radio, Rating, TextareaAutosize } from "@mui/material";
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { bookContext } from "../BookProvider";
import Field from './Field';

let MyData = () => {
    let { book, updateBook } = useContext(bookContext);

    return (
        <Grid container alignItems="center" sx={{ paddingLeft: 4 }}>
            <Field
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
            <Field
                title="Read"
                value={
                    <RadioGroup row name="read"
                        value={book.isRead}
                        onChange={(e) => updateBook({ ...book, isRead: e.target.value === "true" })}
                    >
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                    </RadioGroup>
                }
            />
            {book.isRead === true &&
                <Field
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
            <Field
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
    );
}

export default MyData;