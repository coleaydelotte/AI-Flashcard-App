import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="100vw">
      <head>
        <title>FlashCard SaaS</title>
        <meta name = "description" content="Create flashcard from a text prompt"></meta>
      </head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" style={{flexGrow: 1}}>Flashcard SaaS</Typography>
          <SignedOut>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{
        textAlign: "center",
      }}>
        <Typography variant="h2">Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5">{" "} Create flashcards from a text prompt</Typography>
        <Button variant="contained" color="primary" sx={{mt: 2}}>Get Started</Button>
      </Box>
    </Container>
  );
}
