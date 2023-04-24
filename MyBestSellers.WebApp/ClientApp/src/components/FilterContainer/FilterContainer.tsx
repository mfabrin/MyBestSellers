import { Grid } from '@mui/material';


let FilterContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <form onSubmit={(e: any) => e.preventDefault()}>
            <Grid container alignItems='flex-end'>
                {children}
            </Grid>
        </form>
    )
}

export default FilterContainer;