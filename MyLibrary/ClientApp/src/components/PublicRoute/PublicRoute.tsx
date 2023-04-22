import { useContext } from 'react';
import PublicLayout from './PublicLayout';
import { applicationContext } from 'helpers/services';
import { CircleLoader } from 'components';

interface IProps {
    children: React.ReactNode
}

const PublicRoute = ({ children }: IProps) => {
    let { isLoading } = useContext(applicationContext);

    return (
        <PublicLayout>
            {isLoading === true && <CircleLoader />}
            {isLoading === false && <>{children}</>}
        </PublicLayout>
    );
}

export default PublicRoute;