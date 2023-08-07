import { Fira_Sans } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const firaSans = Fira_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#rgba(0, 0, 0, 0.6)",
    },
    secondary: {
      main: "#F1F6F7",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: firaSans.style.fontFamily,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "filled",
        InputLabelProps: {
          shrink: true,
        },
        InputProps: {
          disableUnderline: true,
        },
      },
      styleOverrides: {
        root: {
          background: "#F1F6F7",
          borderRadius: "11px 11px 11px 11px !important",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          background: "#F1F6F7",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: "#F1F6F7",
        },
      },
    },

    MuiInputBase: {
      defaultProps: {
        //disableClearable: true,
      },
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          background: "#F1F6F7",
          borderRadius: "11px 11px 11px 11px !important",
          border: 0,
          /* "& .MuiInputAdornment-root": { */
          /*   paddingRight: "15px", */
          /*   marginBottom: "10px", */
          /* }, */
        },
        input: {
          /* paddingLeft: "9px", */
          /* paddingRight: "9px", */
          fontSize: "14px",
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        filled: true,
        shrink: true,
        sx: {
          fontSize: "10px",
        },
      },
    },
  },
});

export default theme;
