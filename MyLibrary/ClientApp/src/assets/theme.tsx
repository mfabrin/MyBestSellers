import { createTheme } from '@mui/material/styles';

const spacing = 8;

const theme = createTheme({
    spacing: spacing,
    typography: {
        h1: {
            fontWeight: 600,
            fontSize: '35px',
            letterSpacing: '-0.24px',
            lineHeight: '40px'
        },
        h2: {
            fontWeight: 600,
            fontSize: '29px',
            letterSpacing: '-0.24px',
            lineHeight: '32px'
        },
        h3: {
            fontWeight: 600,
            fontSize: '24px',
            letterSpacing: '-0.06px',
            lineHeight: '28px'
        },
        h4: {
            fontWeight: 600,
            fontSize: '20px',
            letterSpacing: '-0.06px',
            lineHeight: '24px'
        },
        h5: {
            fontWeight: 600,
            fontSize: '16px',
            letterSpacing: '-0.05px',
            lineHeight: '20px'
        },
        h6: {
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '-0.05px',
            lineHeight: '20px'
        }
    },
    components: {
        MuiContainer: {
            defaultProps: {
                maxWidth: false
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    marginTop: spacing,
                    marginBottom: spacing,
                }
            }
        },
        MuiGrid: {
            defaultProps: {
                spacing: 2
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    padding: spacing
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                fullWidth: true
            }
        }
    }
});


export default theme;