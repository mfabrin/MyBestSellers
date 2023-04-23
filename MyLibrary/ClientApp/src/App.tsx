import { SnackbarProvider } from 'notistack';

import theme from 'assets';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Routes, AxiosInterceptors } from 'components';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ApplicationProvider } from 'helpers/services';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CssBaseline />
                <SnackbarProvider preventDuplicate autoHideDuration={4000}>
                    <AxiosInterceptors />
                    <ApplicationProvider>
                        <Routes />
                    </ApplicationProvider>
                </SnackbarProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
