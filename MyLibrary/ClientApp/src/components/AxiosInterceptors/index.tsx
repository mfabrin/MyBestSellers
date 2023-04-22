import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// import { authContext } from 'helpers/services';


let AxiosInterceptors = () => {
    let navigate = useNavigate();
    let { enqueueSnackbar } = useSnackbar();

    // let authService = useContext(authContext);

    axios.interceptors.request.use(async config => {
        // let token = await authService.getToken();

        // if (config.headers)
        //     config.headers['Authorization'] = `Bearer ${token}`;

        return config;
    })

    axios.interceptors.response.use(
        response => response,

        error => {
            let { data, status } = error.response;
            switch (status) {
                case 400:
                    if (data.HasErrors) {
                        data.Errors.forEach((er: string) => {
                            enqueueSnackbar(er, { variant: 'error' });
                        })
                    } else {
                        for (let i in data.errors)
                            enqueueSnackbar(data.errors[i], { variant: 'error' });
                    }
                    break;

                case 403:
                case 401:
                    enqueueSnackbar('User not enabled to do this operation', { variant: 'error' });
                    navigate('/error401', { replace: true });
                    break;

                case 500:
                    enqueueSnackbar('Internal server error', { variant: 'error' });
                    break;

                default:
                    enqueueSnackbar('Unable to connect to server, please check your internet connection and retry.', { variant: 'error' });
                    break;
            }

            return Promise.reject({ ...data });
        }
    )

    return (null);
}

export default AxiosInterceptors;