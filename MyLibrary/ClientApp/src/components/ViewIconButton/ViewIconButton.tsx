import { Tooltip, Zoom, IconButton } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface IProps {
    size?: 'medium' | 'small'
    link: string
}

let ViewIconButton = ({ size, link }: IProps) => {
    return (
        <Tooltip TransitionComponent={Zoom} title="View">
            <IconButton
                size={size}
                color="primary"
                component={Link}
                to={link}
            >
                <SearchIcon />
            </IconButton>
        </Tooltip>
    )
}

export default ViewIconButton;