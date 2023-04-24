import { Grid } from "@mui/material";
import Header from "./Header";

interface IProps {
    title: string
    content: React.ReactNode
}

let Section = (props: IProps) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Header title={props.title} />
            </Grid>
            <Grid item xs={12}>
                {props.content}
            </Grid>
        </Grid>
    );
}

export default Section;