import { useContext } from 'react';
import { Grid, TextField, MenuItem, Button, Pagination, Autocomplete } from '@mui/material';
import { Search } from '@mui/icons-material'
import { FilterContainer } from "components";
import { bestSellersContext } from '../BestSellersProvider';
import { applicationContext } from 'helpers/services';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

let Filters = () => {
    let { bookCategories } = useContext(applicationContext);
    let { search, categories, updateSearch, doSearch } = useContext(bestSellersContext);

    return (
        <FilterContainer>
            <Grid item xs={2}>
                {/* <DatePicker
                    label="Basic date picker"
                    // views={['month', 'year']}
                    value={search.publishDate}
                    onChange={(newValue) => updateSearch({ ...search, publishDate: newValue || dayjs().startOf('month').toDate() })}
                /> */}
                <TextField
                    variant="standard"
                    label="Publish date"
                    value={search.publishDate}
                    onChange={(e) => updateSearch({
                        ...search,
                        publishDate: e.target.value
                    })}
                />
            </Grid>
            <Grid item xs={2}>
                <Autocomplete
                    value={search.category}
                    onChange={(event: any, newValue: string | null) => {
                        updateSearch({ ...search, category: newValue || '' })
                    }}
                    options={bookCategories.filter(x => categories.indexOf(x.key) !== -1).map(x => x.key)}
                    getOptionLabel={(option) => bookCategories.find(x => x.key === option)?.value || ''}
                    renderInput={(params) => <TextField {...params} variant="standard" label="Category" />}
                />
            </Grid>
            <Grid item xs>
                <Button type="submit" variant="contained" color="primary" onClick={() => doSearch(search)}>
                    <Search />
                </Button>
            </Grid>
        </FilterContainer>
    )
}

export default Filters;