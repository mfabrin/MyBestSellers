import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

let AxiosInterceptors = () => {
    axios.interceptors.request.use(async config => {
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
                        for (let i in data.errors) {
                            enqueueSnackbar(data.errors[i], { variant: 'error' });
                        }
                    }
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