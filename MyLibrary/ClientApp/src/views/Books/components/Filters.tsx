import { useContext } from 'react';
import { Grid, TextField, MenuItem, Button } from '@mui/material';
import { FilterContainer } from "components";
import { booksContext } from '../BooksProvider';
import { applicationContext } from 'helpers/services';

let Filters = () => {
    let { bookCategories } = useContext(applicationContext);
    let { search, updateSearch, doSearch } = useContext(booksContext);

    return (
        <FilterContainer>
            <Grid item>
                <TextField
                    variant="standard"
                    label="ISBN"
                    value={search.isbn}
                    onChange={(e) => updateSearch({
                        ...search,
                        isbn: e.target.value
                    })}
                />
            </Grid>
            <Grid item>
                <TextField
                    select
                    variant="standard"
                    label="Category"
                    value={search.category}
                    onChange={(e) => updateSearch({
                        ...search,
                        category: e.target.value
                    })}
                >
                    {bookCategories.map(cat => <MenuItem key={cat.key} value={cat.key}>{cat.value}</MenuItem>)}
                </TextField>
            </Grid>
            <Grid item>
                <Button type="submit" color="secondary" onClick={() => doSearch(search)}>Search</Button>
            </Grid>
        </FilterContainer>
    )
}

export default Filters;