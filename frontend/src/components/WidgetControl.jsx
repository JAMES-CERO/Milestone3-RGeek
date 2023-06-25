import { Box } from "@mui/material";
import { borderColor, styled } from "@mui/system";

const WidgetControl = styled(Box)(({ theme }) => ({
    padding : "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: "white",
    borderRadius: '0.75rem',
    border: '5px',
    borderColor: "red",
}));

export default WidgetControl;