'use client';


import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from 'next/head';


export default function Home() {


  const handleSubmitPro = async () => {
    const checkoutSession = await fetch('/api/checkout_session_pro', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500){
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error){
      console.warn(error.message)
    }
  }

  const handleSubmitBasic = async () => {
    const checkoutSession = await fetch('/api/checkout_session_basic', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500){
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error){
      console.warn(error.message)
    }
  }

  return (
    <Container maxWidth="100vw" sx={{bgcolor: "rgba(14, 14, 14, 0.8)", color: "rgba(235, 235, 235, 0.9)", minHeight: "100vh"}}>
      <Head>
        <title>FlashCards On Demand.</title>
        <meta name="description" content="Create flashcard from a text prompt"></meta>
      </Head>

      <AppBar position="static">
        <Toolbar sx={{bgcolor: "rgba(235, 235, 235, 0.8)", color: "rgba(0, 0, 0, 1)"}}>
          <Typography variant="h5" fontFamily="Arial, sans-serif" component="div" style={{ flexGrow: 1 }}>FlashCards On Demand.</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{
        textAlign: "center",
      }}>
        <Typography variant="h2" fontFamily="Arial, sans-serif" gutterBottom>Welcome</Typography>
        <Button href="/generate" variant="contained" color="primary" sx={{ mt: 2, bgcolor: "rgba(207, 233, 240, 1)", color: "rgba(14, 14, 14, 0.8)"}}>Get Started</Button>
      </Box>
      <Box sx={{ my: 6 }}>
        <Typography fontFamily="Arial, sans-serif" variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography fontFamily="Arial, sans-serif" variant="h6" gutterBottom>
              Easy Text Input
            </Typography>
            <Typography fontFamily="Arial, sans-serif" >
              {' '}
              Simply input your text and let our software do the rest. Create flashcards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography fontFamily="Arial, sans-serif" variant="h6" gutterBottom>
              Smart FlashCards
            </Typography>
            <Typography fontFamily="Arial, sans-serif">
              {' '}
              Our AI intelligently breaks down your text into concise flashcards, perfect for studying
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontFamily="Arial, sans-serif" gutterBottom>
              Accessible Anywhere
            </Typography>
            <Typography fontFamily="Arial, sans-serif">
              {' '}
              Access your flashcards from any device, at any time. Study on the go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" fontFamily="Arial, sans-serif" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" fontFamily="Arial, sans-serif" gutterBottom>Basic</Typography>
              <Typography variant="h6" fontFamily="Arial, sans-serif" gutterBottom>$5 / month</Typography>

              <Typography>
                {' '}
                Access to basic flashcard features and limited storage
              </Typography>
              <Button variant="contained" color="primary" sx={{mt:2, bgcolor: "rgba(207, 233, 240, 1)", color: "rgba(14, 14, 14, 0.8)"}} onClick={handleSubmitBasic}>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" fontFamily="Arial, sans-serif" gutterBottom>Pro</Typography>
              <Typography variant="h6" fontFamily="Arial, sans-serif" gutterBottom>$10 / month</Typography>

              <Typography fontFamily="Arial, sans-serif">
                {' '}
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt:2, bgcolor: "rgba(207, 233, 240, 1)", color: "rgba(14, 14, 14, 0.8)"}} onClick={handleSubmitPro}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
