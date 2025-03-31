import { CircularProgress, Box } from "@mui/material";


export default function Loading() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress size={60} thickness={5} color="primary" />
        </Box>
    );
}