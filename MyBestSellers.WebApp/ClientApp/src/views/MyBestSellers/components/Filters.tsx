import { useContext } from 'react';
import { Grid, TextField, Button, Autocomplete } from '@mui/material';
import { Search } from '@mui/icons-material'
import { FilterContainer } from "components";
import { myBestSellersContext } from '../MyBestSellersProvider';
import { applicationContext } from 'helpers/services';

let Filters = () => {
    let { bookCategories } = useContext(applicationContext);
    let { search, updateSearch, doSearch } = useContext(myBestSellersContext);

    return (
        <FilterContainer>
            <Grid item xs={2}>
                <Autocomplete
                    value={search.category}
                    onChange={(event: any, newValue: string | null) => {
                        updateSearch({ ...search, category: newValue || '' })
                    }}
                    options={bookCategories.map(x => x.key)}
                    getOptionLabel={(option) => bookCategories.find(x => x.key === option)?.value || ''}
                    renderInput={(params) => <TextField {...params} variant="standard" label="Category" />}
                />
            </Grid>
            <Grid item>
                <TextField
                    variant="standard"
                    label="Title"
                    value={search.title}
                    onChange={(e) => updateSearch({ ...search, title: e.target.value })}
                />
            </Grid>
            <Grid item>
                <TextField
                    variant="standard"
                    label="Author"
                    value={search.author}
                    onChange={(e) => updateSearch({ ...search, author: e.target.value })}
                />
            </Grid>
            <Grid item>
                <Button type="submit" variant="contained" color="primary" onClick={() => doSearch(search)}>
                    <Search />
                </Button>
            </Grid>
        </FilterContainer>
    )
}

export default Filters;