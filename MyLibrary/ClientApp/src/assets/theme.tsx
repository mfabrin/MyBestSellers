import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';
// import './scss/main.scss';
// import palette from './palette';

const primary = '#e6ac00';
const spacing = 8;

const theme = createTheme({
    spacing: spacing,
    typography: {
        // fontFamily: ['Muli'].join(','),
        h1: {
            // color: palette.text.primary,
            fontWeight: 600,
            fontSize: '35px',
            letterSpacing: '-0.24px',
            lineHeight: '40px'
        },
        h2: {
            // color: palette.text.primary,
            fontWeight: 600,
            fontSize: '29px',
            letterSpacing: '-0.24px',
            lineHeight: '32px'
        },
        h3: {
            // color: palette.text.primary,
            fontWeight: 600,
            fontSize: '24px',
            letterSpacing: '-0.06px',
            lineHeight: '28px'
        },
        h4: {
            // color: palette.text.primary,
            fontWeight: 600,
            fontSize: '20px',
            letterSpacing: '-0.06px',
            lineHeight: '24px'
        },
        h5: {
            // color: palette.text.primary,
            fontWeight: 600,
            fontSize: '16px',
            letterSpacing: '-0.05px',
            lineHeight: '20px'
        },
        h6: {
            // color: palette.text.primary,
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '-0.05px',
            lineHeight: '20px'
        }
    },
    components: {
        // MuiButton: {
        //     styleOverrides: {
        //         contained: {
        //             color: '#4a4a4a',
        //             borderRadius: 0,
        //             backgroundColor: '#fafafa',
        //             '&:hover': {
        //                 backgroundColor: '#d5d5d5'
        //             }
        //         },
        //         containedPrimary: {
        //             color: '#4a4a4a',
        //             borderRadius: 0,
        //             backgroundColor: '#ffad33',
        //             '&:hover': {
        //                 backgroundColor: '#dd8500'
        //             }
        //         },
        //         outlinedPrimary: {
        //             color: '#fff',
        //             borderRadius: 0,
        //             backgroundColor: '#000',
        //             border: '2px solid #fff',
        //             '&:hover': {
        //                 borderRadius: 0,
        //                 color: '#000',
        //                 backgroundColor: '#fff',
        //                 border: '2px solid #000',
        //             }
        //         },
        //     }
        // },
        MuiChip: {
            styleOverrides: {
                outlinedPrimary: {
                    // color: palette.option1.main,
                    borderRadius: '4px',
                    // border: `1px solid ${palette.option1.main}`
                },
                outlinedSecondary: {
                    // color: palette.secondary.main,
                    borderRadius: '4px',
                    // border: `1px solid ${palette.secondary.main}`
                },
            }
        },
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
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: colors.blueGrey[600],
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.03)'
                    }
                },
                colorPrimary: {
                    color: '#ffad33',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.03)'
                    }
                },
                colorSecondary: {
                    color: '#4c4c4c',
                    '&:hover': {
                        backgroundColor: '#4c4c4c42'
                    }
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    padding: spacing
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: `${spacing}px ${spacing * 2}px ${spacing}px ${spacing * 2}px`
                },
                head: {
                    fontWeight: 600
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.grey[50],
                    fontWeight: 600
                }
            }
        },
        MuiTablePagination: {
            defaultProps: {
                labelDisplayedRows(props) {
                    let pageSize = props.to - props.from + 1
                    return (<span>Page {props.page + 1} of {Math.ceil(props.count / pageSize)}</span>)
                }
            },
        },
        MuiTableRow: {
            styleOverrides: {
                "root": {
                    "&.MuiTableRow-selected": {
                        backgroundColor: "#de6c5973",
                        "&:hover": {
                            backgroundColor: "#de6c5973"
                        }
                    },
                    '&.MuiTableRow-hover': {
                        '&:hover': {
                            boxShadow: '2px 2px 10px 0 rgba(0, 0, 0, .4)'
                        }
                    }
                },
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