import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export default function Alart({ alertopen, alertsetOpen, alertmessage }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={alertopen}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="primary"
              size="small"
              onClick={() => {
                alertsetOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertmessage}
        </Alert>
      </Collapse>
    </Box>
  );
}
