'use client';
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
type Props = {}

function Provider({ children }: any) {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            warning: {
                light: '#fcba03',
                main: '#fcba03',
                dark: '#fcba03',
                contrastText: 'white',
                A700: 'black'
            }
        }
    });
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </div>
    )
}

export default Provider