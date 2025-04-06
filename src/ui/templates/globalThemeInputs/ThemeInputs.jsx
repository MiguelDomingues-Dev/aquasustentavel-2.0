// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                  // Altera a cor do texto digitado
                    "& .MuiInputBase-input": {
                        color: "white",
                    },
                    // Altera a cor do label
                    "& .MuiInputLabel-root": {
                        color: "white",
                    },
                    // Altera a cor do label quando focado
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                    },
                    // Se quiser alterar a cor da linha do TextField (para outlined, por exemplo)
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "white",
                        },
                        "&:hover fieldset": {
                        borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "white",
                        },
                    },
                },
            },
        },
    },
});

export default theme;
