import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography
        variant="h1"
        component="h1"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Hello World!
      </Typography>
    </Box>
  );
}
