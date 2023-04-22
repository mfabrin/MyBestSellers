import { SnackbarProvider } from 'notistack';

// import 'helpers/Extensions';

import theme from 'assets';

import { Routes, AxiosInterceptors } from 'components';
// import { AuthProvider } from 'helpers/services';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ApplicationProvider } from 'helpers/services';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider preventDuplicate autoHideDuration={4000}>
                {/* <AuthProvider> */}
                <AxiosInterceptors />
                <ApplicationProvider>
                    <Routes />
                </ApplicationProvider>
                {/* </AuthProvider> */}
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
