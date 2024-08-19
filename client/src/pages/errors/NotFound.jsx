import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound({ backTo = "/workspace/boards" }) {
  return (
    <Box
      sx={{
        maxWidth: 600,
      }}
      className="h-screen w-full mx-auto text-center mt-10"
    >
      <Typography className="text-4xl mb-5" component={"h3"}>
        Page not found.
      </Typography>
      <Typography className="text-xl mb-5" component={"p"}>
        This page may be private. If someone gave you this link, you may need to
        be a board or Workspace member to access it.
      </Typography>

      <Link to={backTo} className="hover:no-underline">
        <Button
          sx={{
            width: 180,
          }}
          variant="contained"
        >
          Go Back
        </Button>
      </Link>
    </Box>
  );
}

export default NotFound;
