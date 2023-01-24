import {
    createTheme,
} from '@mui/material/styles';


export const headerTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#fff',
            contrastText: "#ffa306"
        }
    }
})

export const yellowColorTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffa306',
            light: '#ffa306bd',
            dark: '#ffa206',
            contrastText: '#fff',
        },
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                position: "relative",
                "& $notchedOutline": {
                    borderColor: "#FFFFFF"
                },
                "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
                    borderColor: "#ffa306",
                    "@media (hover: none)": {
                        borderColor: "#ffa306"
                    }
                },
                "&$focused $notchedOutline": {
                    borderColor: "#ffa306",
                    borderWidth: 1
                }
            }
        }
    }
});