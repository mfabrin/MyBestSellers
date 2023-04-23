import { Grid } from '@mui/material';


let FilterContainer: React.FC<{ stopPropagation?: boolean, children: React.ReactNode }> = ({ stopPropagation = false, children }) => {
    return (
        <form onSubmit={(e: any) => {
            e.preventDefault();
            
            if (stopPropagation === true)
                e.stopPropagation();
        }
        }>
            <Grid container alignItems='flex-end'>
                {children}
            </Grid>
        </form>
    )
}

export default FilterContainer;