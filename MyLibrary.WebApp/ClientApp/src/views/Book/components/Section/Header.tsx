
import { CardHeader, Typography } from "@mui/material";
import theme from "assets";


interface IProps {
    title: string
    action?: React.ReactNode
}

let Header = ({ title, action }: IProps) => {

    return (
        <CardHeader
            disableTypography
            sx={{
                borderBottom: '1px solid #eeeeee',
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2)
            }}
            title={
                <Typography variant="h5" sx={{
                    color: theme.palette.grey[400],
                    fontWeight: 700,
                    textTransform: 'uppercase',
                }}>
                    {title}
                </Typography>
            }
            action={action && <div style={{ paddingRight: 24 }}>{action}</div>}
        />
    )
}

export default Header;